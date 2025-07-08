import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private fb:FormBuilder,
    private auth : AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.registerForm.invalid) return;
    // Ahora registerForm.value tiene el tipo {name: string; email: string; password: string;}
    // @ts-ignore
    this.auth.register(this.registerForm.value).subscribe({
      next: () => this.router.navigate(['/products']),
      error: err => console.error(err)
    });
  }

}
