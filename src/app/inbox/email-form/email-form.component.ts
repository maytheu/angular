import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css'],
})
export class EmailFormComponent implements OnInit {
  @Input() email!: Email;
  @Output() emailSubmit = new EventEmitter();

  emailForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    const { subject, to, id, from, text } = this.email;

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({ value: from, disabled: true }),
      text: new FormControl(text, [Validators.required]),
      subject: new FormControl(subject, [Validators.required]),
    });
  }

  onSubmit() {
    this.emailSubmit.emit(this.emailForm.getRawValue()); //plus val of disabled field
  }
}
