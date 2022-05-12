import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface WikiResponse {
  query: {
    search: {
      title: string;
      snippet: string;
      pageid: number;
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class WikiService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    const url = `https://en.wikipedia.org/w/api.php`;
    return this.http.get<WikiResponse>(url, {
      params: {
        action: 'query',
        list: 'search',
        srsearch: term,
        format: 'json',
        utf8: '1',
        origin: '*',
      },
    });
  }
}
