import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth-page.html',
  styleUrls: ['./auth-page.scss'],
})
export class AuthPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  isLogin = signal<boolean>(true);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  authForm = this.fb.group({
    username: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const tab = params['tab'];
      if (tab === 'register') {
        this.toggleMode(false);
      } else {
        this.toggleMode(true);
      }
    });
  }

  toggleMode(toLogin: boolean) {
    this.isLogin.set(toLogin);
    this.errorMessage.set(null);
    this.authForm.reset();

    if (toLogin) {
      this.authForm.get('username')?.clearValidators();
    } else {
      this.authForm.get('username')?.setValidators([Validators.required]);
    }
    this.authForm.get('username')?.updateValueAndValidity();

    // Update URL query params without reloading the page
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: toLogin ? 'login' : 'register' },
      queryParamsHandling: 'merge',
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    const formValue = this.authForm.value;

    if (this.isLogin()) {
      this.authService.login({ email: formValue.email, password: formValue.password }).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/']); // Redirect after successful login
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.error || 'Error al iniciar sesión.');
        },
      });
    } else {
      this.authService
        .register({
          email: formValue.email,
          password: formValue.password,
          username: formValue.username,
        })
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.router.navigate(['/']); // Redirect after successful registration
          },
          error: (err) => {
            this.isLoading.set(false);
            this.errorMessage.set(err.error?.error || 'Error al registrar el usuario.');
          },
        });
    }
  }
}
