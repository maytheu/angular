import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface SignupData {
  username: string;
  password: string;
  passwordConfirmation: string;
}

export interface SigninData {
  username: string;
  password: string;
}

export interface signedinResponse {
  authenticated: boolean;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authurl = 'https://api.angular-email.com/auth/';
  signin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  availableUsername(username: string) {
    return this.http.post<{ available: boolean }>(`${this.authurl}username`, {
      username,
    });
  }

  signup(data: SignupData) {
    return this.http
      .post<{ username: string }>(`${this.authurl}signup`, data)
      .pipe(tap(() => this.signin$.next(true)));
  }

  checkAuth() {
    return this.http
      .get<signedinResponse>(`${this.authurl}signedin`)
      .pipe(tap(({ authenticated }) => this.signin$.next(authenticated)));
  }

  signout() {
    return this.http
      .post(`${this.authurl}signout`, {})
      .pipe(tap(() => this.signin$.next(false)));
  }

  signin(data: SigninData) {
    return this.http
      .post(`${this.authurl}signin`, data)
      .pipe(tap(() => this.signin$.next(true)));
  }
}
