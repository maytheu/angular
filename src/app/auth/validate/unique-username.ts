import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';

// needed for http client
@Injectable({ providedIn: 'root' })
export class UniqueUsername implements AsyncValidator {
  constructor(private auth: AuthService) {}

  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    const username = control.value;

    return this.auth.availableUsername(username).pipe(
      map(() => {
        // on successfull
        return null;
      }),
      catchError((err) => {
        if (err.error.username) {
          return of({ nonuniqueusername: true });
        } else {
          return of({ noConnection: true });
        }
      })
    );
  };
}
