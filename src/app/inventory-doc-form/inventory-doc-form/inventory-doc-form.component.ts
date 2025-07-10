import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InventoryDocumentService} from "../../core/services/inventory-document.service";

@Component({
  selector: 'app-inventory-doc-form',
  standalone: true,
  imports: [],
  templateUrl: './inventory-doc-form.component.html',
  styleUrl: './inventory-doc-form.component.css'
})
export class InventoryDocFormComponent{

  docForm = FormGroup;
  types = ['IN', 'OUT'];

  constructor(
    private fb: FormBuilder,
    private docService: InventoryDocumentService
  ) {}


}
