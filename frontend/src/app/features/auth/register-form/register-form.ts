import { Router } from '@angular/router';
import { Component, signal } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-form.html',
})
export class RegisterForm {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  errorMessage = signal<string | null>(null);

  submit() {
    if (this.form.invalid) return;

    this.auth.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.log(err);

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
