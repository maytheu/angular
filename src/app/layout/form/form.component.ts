import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Forms } from 'src/app/interface/form';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() textColor: string = '';
  @Input() border = '';
  @Input() mt = '';
  @Input() width = '';
  @Output() submitForm: EventEmitter<any> = new EventEmitter();
  @Input() btnText: string = '';
  constructor() {}

  ngOnInit(): void {}

  formSubmit() {
    this.submitForm.emit();
  }
}
