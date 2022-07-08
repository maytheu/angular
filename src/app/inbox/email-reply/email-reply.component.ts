import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css'],
})
export class EmailReplyComponent implements OnChanges {
  @Input() email!: Email;
  showModal = false;

  constructor(private emailService: EmailService) {}

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------------- ${
        this.email.from
      } wrote:\n> ${this.email.text.replace(/\n/gi, '\n> ')}`,
    };
  }
  emailUpdate(email: Email) {
    this.emailService
      .createEmail(email)
      .subscribe(() => (this.showModal = false));
  }
}
