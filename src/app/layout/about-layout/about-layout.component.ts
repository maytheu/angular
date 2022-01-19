import { Component, OnInit } from '@angular/core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Country } from 'src/app/interface/Country';

@Component({
  selector: 'app-about-layout',
  templateUrl: './about-layout.component.html',
  styleUrls: ['./about-layout.component.css'],
})
export class AboutLayoutComponent implements OnInit {
  location = faMapMarkerAlt;
  countrys: Country[] = [
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
    {
      flag: '../../../assets/data.jpeg',
      country: 'Wirepick Benin',
      address: 'Face BIBE Jericho Rue de la Liberation Cotonou, Benin',
    },
  ];
  imageSource: string = '';
  constructor() {
    this.imageSource = '../../../assets/data.jpeg';
  }

  ngOnInit(): void {}
}
