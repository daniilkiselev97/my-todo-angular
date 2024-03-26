import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent {

  constructor(private _authService: AuthService){

  }


  public myForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  handleSubmit(){
    this._authService.login({
      email: this.myForm.controls.username.value,
      password: this.myForm.controls.password.value
    } as any).subscribe()
   
  }
  
}
