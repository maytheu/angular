import { Component, OnInit } from '@angular/core';
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Forms } from 'src/app/interface/form';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  location = faMapMarkerAlt;
  envelope = faEnvelope;
  inputs: Forms[] = [
    { type: 'text', name: '', placeholder: 'Name/company', title: 'name' },
    { type: 'text', name: '', placeholder: 'Name/company', title: 'name' },
    { type: 'text', name: '', placeholder: 'Name/company', title: 'name' },
    { type: 'text', name: '', placeholder: 'Name/company', title: 'name' },
  ];
  textarea: string = 'textarea';
  type: string = 'textarea';
  title: string = 'message';
  name: string = '';
  placeholder: string = 'Message';
  textColor: string = 'red';
  border: string = 'red';
  mt: string = '3px';
  width: string = '100%';
  btnText: string = 'submit';
  constructor() {}

  ngOnInit(): void {}
  contactForm() {
    console.log(this.name);
  }
}
