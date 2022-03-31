import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentPage: number = 3;
  images = [
    {
      title: 'At the beach',
      urL: 'https://images.unsplash.com/photo-1538964173425-93884d739596?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fGJlYWNofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Forest buzz',
      url: 'https://images.unsplash.com/photo-1425913397330-cf8af2ff40a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zm9yZXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Home sweet home',
      url: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'A miniayure society',
      url: 'https://images.unsplash.com/photo-1591123120675-6f7f1aae0e5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHNjaG9vbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
  ];
}
