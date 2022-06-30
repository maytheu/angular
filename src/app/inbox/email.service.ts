import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from './email';

export interface EmailSummary {
  id: string;
  subject: string;
  from: string;
}



// with credential is not needed since we alradey have an http interceptor
@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private inboxurl = 'https://api.angular-email.com/';

  constructor(private http: HttpClient) {}

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.inboxurl}emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.inboxurl}emails/${id}`);
  }
}
