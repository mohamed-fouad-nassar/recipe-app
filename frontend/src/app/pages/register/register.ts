import { Component } from '@angular/core';
import { RegisterForm } from '../../features/auth/register-form/register-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [RegisterForm, RouterLink],
})
export class Register {}
