import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginForm } from '../../features/auth/login-form/login-form';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [RouterLink, LoginForm],
})
export class Login {}
