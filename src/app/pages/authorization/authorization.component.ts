import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {

  public myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private _authService: AuthService) {
    // this.myForm.patchValue({
    //   email: 'abc@yandex.ru',
    //   password: 'abc'
    // })
  }

  public handleSubmit(): void {
    if (this.myForm.controls.email.value === null || this.myForm.controls.password.value === null) return;

    const userLogin = {
      email : this.myForm.controls.email.value,
      password: this.myForm.controls.password.value
    };

    const subs = this._authService.login(userLogin).subscribe(() => {
      subs.unsubscribe();
    });
  }
}

//Beh Sub хранить состояние(next|.value) и слушать это состояние 
