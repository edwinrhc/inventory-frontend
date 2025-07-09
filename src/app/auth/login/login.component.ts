import {Component} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {AbstractControl} from '@angular/forms';

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

  errorMessage: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
  }

  get username(): AbstractControl {
    return this.loginForm.get('username')!;
  }
  get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    this.submitted = true;
    // console.log('onSubmit ejecutado, valor form:', this.loginForm.value);
    this.errorMessage = null;
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    // @ts-ignore
    this.auth.login(this.loginForm.value).subscribe({
      next: res => {
        // console.log('Token (component):', res.access_token);
        this.router.navigate(['/products']);
      },
      error: err => {
        // Capturamos mensaje desde el backend o genérico
        this.errorMessage = err.error?.message || 'Ocurrió un error al iniciar sesión. Intenta más tarde.';
        console.error('Error al loguear:', err)
        setTimeout(() => this.errorMessage = null, 5000);
      }
    });
  }


}
