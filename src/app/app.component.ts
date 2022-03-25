import { Component } from '@angular/core';
import { lorem } from 'faker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  randomText: string = lorem.sentence();
  enteredText: string = '';
  isSuccess: boolean = false;

  onInput(e: any) {
    this.enteredText = e.value;
    if (this.randomText === this.enteredText) {
      this.isSuccess = true;
    }
  }

  compare(sentence: string, input: string) {
    if (!input) {
      return 'pending';
    }
    return sentence === input ? 'correct' : 'incorrect';
  }
}
