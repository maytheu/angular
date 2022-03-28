import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name: string = '';
  date: string = '';
  amount: number = 0;
  height: number = 0;
  miles:number=0

  onNameChange(e: any) {
    this.name = e.value;
  }

  onDateChange(e: any) {
    this.date = e.value;
  }

  onAmountChange(e: any) {
    this.amount = parseFloat(e.value);
  }

  onHeightChange(e: any) {
    this.height = parseFloat(e.value);
  }

  onMilesChange(e: any) {
    this.miles = parseFloat(e.value);
  }
}
