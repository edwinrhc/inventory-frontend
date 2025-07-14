import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import {Product} from '../../core/models/product/product';
import {InventoryDocumentService} from '../../core/services/inventory-document.service';
import {ProductsService} from "../../core/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Component, OnInit, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {NgSelectModule} from "@ng-select/ng-select";
import {Subject, catchError, debounceTime, distinctUntilChanged, finalize, switchMap, tap, of} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {CreateInventoryResponse} from "../../core/models/inventory-document/dto/create-inventory-response";
import {InventoryItemsService} from "../../core/services/inventory-items.service";

@Component({
  selector: 'app-inventory-document',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgSelectModule],
  templateUrl: './inventory-document.component.html',
  styleUrl: './inventory-document.component.css'
})
export class InventoryDocumentComponent implements OnInit {

  @Input() movementType: 'IN' | 'OUT';
  form!: FormGroup;
  products: Product[] = [];
  loadingProducts = false;

  protected productInput$ = new Subject<string>();


  constructor(
    private fb: FormBuilder,
    private docSvc: InventoryDocumentService,
    private productSvc: ProductsService,
    protected router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private inventoryItems: InventoryItemsService,
  ) {
    // o lo lees de ActivatedRoute
    this.form = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      reference: ['', Validators.required],
      notes: [''],
      lines: this.fb.array([])
      // lines: this.fb.array([ this.createLineGroup() ])
    });

    // this.movementType = this.route.snapshot.data['movementType'];
    this.movementType = this.route.snapshot.data['movementType'] || 'IN';
  }

  ngOnInit() {

    this.buildForm();
    this.setupProductSearch();
    this.loadNextReference();
    this.addLine();      // Al menos una línea

  }

  private buildForm(): void {
    this.form = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      reference: ['', Validators.required],
      notes: [''],
      lines: this.fb.array([]),
    })
  }

  get lines(): FormArray {
    return this.form.get('lines') as FormArray;
  }

  private createLineGroup(): FormGroup {
    const fg = this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [null, Validators.required],
      detail: [''],
      maxStock:  [{ value: 0, disabled: true }]
    });

    // Cuando cambie el producto, consulto stock y actualizo maxStock + validators
    fg.get('productId')!.valueChanges
      .pipe(
        switchMap(pid => pid
          // llamo a tu servicio de productos para traer el stock
          ? this.inventoryItems.getInventoryItem(pid)
          : of({quantity: 0})
        )
      )
      .subscribe(item => {
        const stock = item.quantity;
        fg.get('maxStock')!.setValue(stock, {emitEvent: false});

        // redefino validadores: mínimo 1 y máximo stock
        const validators = [
          Validators.required,
          Validators.min(1),
        ];
        // Solo en salidas agrego el Validators.max(stock)
        if(this.movementType=== 'OUT'){
          validators.push(Validators.max(stock));
        }
        const qty = fg.get('quantity')!;
        qty.setValidators(validators);
        qty.updateValueAndValidity();
      });
    return fg;
  }

  addLine(): void {
    this.lines.push(this.createLineGroup());
  }

  removeLine(index: number): void {
    this.lines.removeAt(index);
  }

  onProductSearch(term: string): void {
    this.productInput$.next(term);
  }

  private setupProductSearch(): void {
    this.productInput$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.loadingProducts = true),
        switchMap(term => this.productSvc.list(1, 20, term)
          .pipe(
            catchError(() => of({items: []})),
            finalize(() => this.loadingProducts = false),
          )
        )
      )
      .subscribe(res => this.products = res.items);
  }

  // === Siguiente referencia automática ===

  private loadNextReference(): void {
    this.docSvc.peekNextReference(this.movementType)
      .subscribe({
        next: ref => this.form.patchValue({reference: ref}),
        error: () => this.toastr.error('No se pudo obtener referencia', 'Error'),
      });
  }

  // === Submit & manejo de errores ===

  onSubmit(): void {
    console.log('SUBMIT →', this.form.valid, this.form.value);
    if (this.form.invalid) {
      this.toastr.error('Completa todos los campos obligatorios', 'Validación');
      return;
    }

    // Chequeo extra: si alguna línea supera stock
    const over = this.lines.controls.some(l =>
      l.get('quantity')!.hasError('max')
    );
    if (over) {
      this.toastr.error('Hay líneas cuya cantidad supera el stock', 'Validación');
      return;
    }

    // Construyo el DTO “limpio” sin maxStock
    const payload = {
      type: this.movementType,
      date: this.form.get('date')?.value,
      reference: this.form.get('reference')?.value,
      notes: this.form.get('notes')?.value,
      lines: this.lines.value.map((l: any) => ({
        productId: l.productId,
        quantity:  l.quantity,
        unitPrice: l.unitPrice,
        detail:    l.detail
      }))
    };

    this.docSvc.create(payload).subscribe({
      next: (res: CreateInventoryResponse) => {
        // @ts-ignore
        this.toastr.success(res.message, '¡Operación exitosa!');
        res.warnings.forEach(w => this.toastr.warning(w, 'Alerta de stock'));
        this.router.navigate(['/inventory/list']);
      },
      error: err => this.handleError(err)
    });
  }

  private handleError(err: any): void {
    console.error('>> SERVER ERROR BODY:', err.error);

    const raw = err.error?.message;
    const messages: string[] = Array.isArray(raw)
      ? raw
      : ( typeof raw === 'string'
        ? [raw]
        : ['Error desconocido'] );

    if (err.status === 400 && !Array.isArray(raw)) {
      // Error de negocio único (p.ej. stock insuficiente)
      this.toastr.error(messages[0], '¡Ops, algo salió mal!');
    } else {
      // Varios errores de validación
      messages.forEach(m =>
        this.toastr.error(m, 'Error de validación')
      );
    }
  }


  onCancel() {
    this.router.navigate(['/inventory/list']);
  }

}
