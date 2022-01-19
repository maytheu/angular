import { Component, Input, OnInit } from '@angular/core';
import { Forms } from 'src/app/interface/form';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css'],
})
export class FormArrayComponent implements OnInit {
  @Input() formFields: Forms[] = [];

  constructor() {}

  ngOnInit(): void {}
}
