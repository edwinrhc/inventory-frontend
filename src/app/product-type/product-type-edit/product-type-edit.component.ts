import {Component, OnInit} from '@angular/core';
import {ProductType} from "../../core/models/product-type/ProductType";
import {ProductTypeService} from "../../core/services/product-type.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {UpdateTypeProductDto} from "../../core/models/product-type/dto/update-type-product.dto";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-product-type-edit',
  standalone: true,
  imports: [
    FormsModule,CommonModule,RouterModule
  ],
  templateUrl: './product-type-edit.component.html',
  styleUrl: './product-type-edit.component.css'
})
export class ProductTypeEditComponent implements OnInit{

  type: ProductType = {id: '', name: '', description: '', isActive: true};
  id!: string;
  returnPage = 1;
  currentPage = 1;

  constructor(
    private svc: ProductTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    const qp = this.route.snapshot.queryParamMap.get('page');
    this.returnPage = qp ? +qp : 1;

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.svc.get(this.id).subscribe({
      next:prod => {
        this.type = prod;
      },
      error: err => {
        console.error('Error cargando tipo de producto', err);
        this.router.navigate(['product-types']);
      }
    })

  }


  onSubmit(){
    const dto: UpdateTypeProductDto = {
        name: this.type.name,
        description: this.type.description,
    };

    this.svc.update(this.id, dto).subscribe({
      next: () => this.router.navigate(
        ['/product-types'],
        { queryParams: { page: this.returnPage } }
        ),
      error: err => {
        console.error('Error actualizando tipo de producto', {
          status: err.status,
          body: err.error
        });
        alert(`Error ${err.status}:\n${JSON.stringify(err.error, null, 2)}`);
      }
    })
  }

  onCancel(){
    this.router.navigate(
      ['product-types'],
      { queryParams: { page: this.returnPage } }
    );
  }



}
