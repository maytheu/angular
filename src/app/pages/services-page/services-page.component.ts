import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interface/Menu';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.component.html',
  styleUrls: ['./services-page.component.css'],
})
export class ServicesPageComponent implements OnInit {
  services: Menu[] = [
    {
      link: 'Wirepick offers tailor-made mobile solutions and accompanied you in all phases of your mobile application project: requirements expression, development, data migration, staff training, maintenance and support. Our solutions are tailored to your business and evolve with the growth of your business.',
      title: 'Mobile App',
      icon: '',
    },
    {
      link: 'Our developers are skilled in developing applications that are tailored to meet your needs. With knowledge in various skills. Wirepick can help convert your legacy systems into modern day applications or build new ones from scratch.',
      title: 'enterprise app',
      icon: '',
    },
    {
      link: 'This is a state-of-the-art application that is being used by many clients, especially banks to convey notifications to their clients’ mobile phones and by emails. With guaranteed delivery, security and speed at the core of this application, Wirepick is a provider of choice.',
      title: 'Messaging',
      icon: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
