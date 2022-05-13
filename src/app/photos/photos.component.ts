import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css'],
})
export class PhotosComponent implements OnInit {
  photo=''

  constructor(private photoService: PhotosService) {}

  ngOnInit(): void {
    this.reload()
  }

  reload(){
    this.photoService
      .getPhoto()
      .subscribe((data) => (this.photo = data.urls.regular));
  }
}
