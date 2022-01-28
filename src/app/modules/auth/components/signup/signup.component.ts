import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectRoutes } from 'src/app/constants';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { EmailValidators } from 'src/app/core/validators/email.validators';
import { PasswordValidators } from 'src/app/core/validators/password.validators';
import { UserDetails } from 'src/app/core/interfaces/user-details';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private authService: AuthService, private userService: UserService, private route: Router) {}

  errorsOnSubmit: boolean;
  commonError: string;
  signInPath = `/${ProjectRoutes.AUTH}/${ProjectRoutes.SIGNIN}`;
  isSubmitBtnDisabled: boolean;

  ngOnInit(): void {
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = false;
  }
  form: FormGroup = new FormGroup({
    fname: new FormControl('', Validators.required),
    lname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      PasswordValidators.mustBeValid,
      PasswordValidators.cannotContainSpace,
    ]),
  });
  get fname() {
    return this.form.get('fname');
  }
  get lname() {
    return this.form.get('lname');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  async signup() {
    if (this.email.errors || this.password.errors || this.fname.errors) {
      this.commonError = 'Please fill valid details';
      this.errorsOnSubmit = true;
      return;
    }
    this.errorsOnSubmit = false;
    this.isSubmitBtnDisabled = true;
    try {
      const newUserID = await this.authService.createUser(this.email.value, this.password.value);
      const userData: UserDetails = {
        email: this.email.value,
        fname: this.fname.value,
        lname: this.lname.value,
        password: this.password.value,
      };
      await this.userService.storeUser(userData);
      await this.userService.updateUser({ id: newUserID });

      this.isSubmitBtnDisabled = false;
      this.route.navigate([ProjectRoutes.DASHBOARD]);
    } catch (error: any) {
      this.isSubmitBtnDisabled = false;
      this.errorsOnSubmit = true;

      if ((error.message as string).indexOf('email-already-in-use') >= 0) {
        this.commonError = 'Email already in use.';
      } else this.commonError = error.message;
    }
  }
}
