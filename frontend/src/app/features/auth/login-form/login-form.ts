import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-form.html',
})
export class LoginForm {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  errorMessage = signal<string | null>(null);

  submit() {
    if (this.form.invalid) return;

    this.auth.login(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        let msg = err.error.message || 'An unexpected error occurred';
        this.errorMessage.set(msg);

        if (err.error.errors && Array.isArray(err.error.errors)) {
          this.errorMessage.set('Validation failed');
          err.error.errors.forEach((errorItem: { field: string; message: string }) => {
            const control = this.form.get(errorItem.field);
            if (control) {
              control.setErrors({ serverError: errorItem.message });
              control.markAsTouched();
            }
          });
        }
      },
    });
  }
}
