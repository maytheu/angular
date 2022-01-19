import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-inputs',
  templateUrl: './login-inputs.component.html',
  styleUrls: ['./login-inputs.component.css'],
})
export class LoginInputsComponent implements OnInit {
  // loginForm = new FormGroup({
  //   username: new FormControl('',[Validators.required]),
  //   password: new FormControl(''),
  // });

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.minLength(8)],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // this.username.setValue('Laue'); for just form control
    // this.loginForm.patchValue({ username: 'Laue' }); for form control
  }

  onLoginForm() {
    console.warn(this.loginForm.value);
    //send to db
  }
}
