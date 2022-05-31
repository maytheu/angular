import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';

// needed for http client
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const { username } = control.value;
    console.log(username);
    return null;
  }
}
