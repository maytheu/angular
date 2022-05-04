import { Component } from '@angular/core';
import { WikiService } from './wiki.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pages: any = [];

  constructor(private wiki: WikiService) {}

  onTermSearch(term: string) {
    this.wiki.search(term).subscribe((data: any) => {
      this.pages = data.query.search;
    });
  }
}
