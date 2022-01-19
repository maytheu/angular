import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/interface/Menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  logoPath: string = '';
  toggleMenu: boolean = false;
  menus: Menu[] = [
    { title: 'Home', link: '/' },
    { title: 'about us', link: '/about' },
    { title: 'services', link: '/services' },
    { title: 'contact', link: '/contact' },
  ];
  bars: any = 3;

  constructor(private router: Router) {
    this.logoPath = '../../../assets/logo.png';
    this.bars = Array(3).fill(1);
  }

  ngOnInit(): void {}

  location(route: string) {
    return this.router.url === route;
  }

  onToggleMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
}
