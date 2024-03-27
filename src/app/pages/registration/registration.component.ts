import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  constructor(private _authService: AuthService){
  }

  public myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    fio: new FormControl('', Validators.required)
  });

  handleSubmit() {
    const subs = this._authService.signup({
      email: this.myForm.controls.email.value,
      password: this.myForm.controls.password.value,
      fio: this.myForm.controls.fio.value
    } as any).subscribe(() => {
      subs.unsubscribe()

    });
  };
}
