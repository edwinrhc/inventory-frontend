import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('onSubmit ejecutado, valor form:', this.loginForm.value);
    if (this.loginForm.invalid) return;
    // @ts-ignore
    this.auth.login(this.loginForm.value).subscribe({
      next: res => {
        console.log('Token (component):', res.access_token);
        this.router.navigate(['/products']);
      },
      error: err => console.error('Error al loguear:', err)
    });
  }


}
