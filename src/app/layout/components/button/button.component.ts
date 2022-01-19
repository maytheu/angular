import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() bgColor: string = '';
  @Input() textColor = '';
  @Input() border = '';
  @Input() mt = '';
  @Input() width = '';
  @Input() htBefore: string = '';
  @Input() htAfter: string = '';
  @Output() clickBtn = new EventEmitter<MouseEvent>();
  constructor() {}

  ngOnInit(): void {}

  onBtnClick() {
    this.clickBtn.emit();
  }
}
