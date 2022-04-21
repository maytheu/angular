import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  onTermSearch(term: string) {
    console.log(term, 'from parent');
    
  }
}
