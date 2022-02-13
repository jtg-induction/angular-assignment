import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectRoutes } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { PasswordValidators } from 'src/app/core/validators/password.validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  errorsOnSubmit: boolean = false;
  isSubmitBtnDisabled: boolean;
  commonError: string;
  signUpPath = `/${ProjectRoutes.AUTH}/${ProjectRoutes.SIGNUP}`;

  ngOnInit(): void {
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = false;
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, PasswordValidators.cannotContainSpace]),
  });
  get fname() {
    return this.form.get('fname');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  async signin() {
    if (this.email.errors || this.password.errors) {
      this.commonError = 'Please fill valid details';
      this.errorsOnSubmit = true;
      return;
    }
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = true;
    try {
      await this.authService.logIn(this.email.value as string, this.password.value as string);
      this.isSubmitBtnDisabled = false;
      this.route.navigate([ProjectRoutes.DASHBOARD]);
    } catch (err: any) {
      this.isSubmitBtnDisabled = false;
      this.errorsOnSubmit = true;
      this.commonError = 'Wrong username or password';
    }
  }
}
