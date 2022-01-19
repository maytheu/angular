import { Component, OnInit } from '@angular/core';
import {
  faTwitterSquare,
  faFacebookSquare,
  faLinkedin,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  facebook = faFacebookSquare;
  twitter = faTwitterSquare;
  linkedin = faLinkedin;

  constructor() {}

  ngOnInit(): void {}
}
