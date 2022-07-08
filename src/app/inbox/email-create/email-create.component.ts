import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.css'],
})
export class EmailCreateComponent implements OnInit {
  showModal = false;
  email: Email;
  constructor(
    private athService: AuthService,
    private emailService: EmailService
  ) {
    this.email = {
      to: '',
      from: `${athService.username}@angular-email.com`,
      subject: '',
      html: '',
      id: '',
      text: '',
    };
  }

  ngOnInit(): void {}

  emailCreate(form: Email) {
    this.emailService
      .createEmail(form)
      .subscribe(() => (this.showModal = false));
  }
}
