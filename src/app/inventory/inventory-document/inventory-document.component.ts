
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

import { Product } from '../../core/models/product/product';
import { InventoryDocumentService } from '../../core/services/inventory-document.service';
import {ProductsService} from "../../core/services/products.service";
import {ActivatedRoute, Router} from "@angular/router";
import { Component, OnInit, Input } from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-inventory-document',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-document.component.html',
  styleUrl: './inventory-document.component.css'
})
export class InventoryDocumentComponent implements OnInit{

  @Input() movementType: 'IN' | 'OUT';
  form: FormGroup;
  products: Product[] = [];

  constructor(
    private fb: FormBuilder,
    private docSvc: InventoryDocumentService,
    private productSvc: ProductsService,
    protected router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      reference: ['', Validators.required],
      notes: [''],
      lines: this.fb.array([])
    });
    this.movementType = this.route.snapshot.data['movementType'];
  }

  ngOnInit() {
    this.productSvc.list(1, 1000, '').subscribe(r => this.products = r.items);
    this.docSvc.peekNextReference(this.movementType)
      .subscribe({
        next: ref => this.form.patchValue({ reference: ref }),
        error: err => console.error('No se pudo obtener referencia', err)
      });

    this.addLine();
  }
  get lines(): FormArray {
    return this.form.get('lines') as FormArray;
  }

  addLine() {
    this.lines.push(this.fb.group({
      productId: [null, Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [null],
      detail: ['']
    }));
  }

  removeLine(index: number) {
    this.lines.removeAt(index);
  }

  onSubmit() {
    if (this.form.invalid) return;
    const dto = {
      type: this.movementType,
      ...this.form.value
    };
    this.docSvc.create(dto).subscribe({
      next: savedDoc => {
        console.log('Documento creado', savedDoc);
        alert(`✅ Documento registrado correctamente.`);
        this.router.navigate(['/inventory/list']);
      },
      error: err => {
        console.error('Error al crear documento', err);
        alert(`❌ No se pudo crear el documento: ${err.message}`);
      }
    })
  }

  onCancel(){
    this.router.navigate(['/inventory/list']);
  }

}
