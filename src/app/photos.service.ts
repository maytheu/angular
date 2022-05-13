import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Photos{
  urls:{
    regular:string
  }
}

@Injectable({
  providedIn: 'root',
})
export class PhotosService {
  constructor(private http: HttpClient) {}

  getPhoto() {
    return this.http.get<Photos>('https://api.unsplash.com/photos/random', {
      headers: {
        Authorization:
          'Client-ID 08d19507529308e6b6874e4bce18a309019a26273da0556b967fa3969e97cf1',
      },
    });
  }
}
