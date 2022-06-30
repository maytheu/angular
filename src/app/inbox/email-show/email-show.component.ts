import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css'],
})
export class EmailShowComponent implements OnInit {
  email!: Email;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {
    this.route.data.subscribe(({ email }) => {
      this.email = email;
    });
  }

  ngOnInit(): void {
    //changing this to resolver

    //   this.route.params
    //     .pipe(
    //       switchMap(({ emailId }) => {
    //         return this.emailService.getEmail(emailId);
    //       })
    //     )
    //     .subscribe((email) => {
    //       this.email = email;
    //     });
  }
}
