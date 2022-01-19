import { Component, Input, OnInit } from '@angular/core';
import { Menu } from 'src/app/interface/Menu';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  @Input() services: Menu[] = [];

  constructor() {}

  ngOnInit(): void {}
}
