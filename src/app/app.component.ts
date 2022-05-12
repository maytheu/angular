import { Component } from '@angular/core';
import { WikiService } from './wiki.service';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pages: any = [];

  constructor(private wiki: WikiService) {}

  onTermSearch(term: string) {
    this.wiki
      .search(term)
      .pipe(pluck('query', 'search'))
      .subscribe((data) => {
        this.pages = data;
      });
  }
}
