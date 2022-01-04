import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string = 'Track Tracker';
  showAddTask: boolean = false;
  subcription: any = Subscription;

  constructor(private uiService: UiService, private router: Router) {
    // track value
    this.subcription = this.uiService
      .onToggleComponent()
      .subscribe((val) => (this.showAddTask = val));
  }

  ngOnInit(): void {}

  toggleAddTask(): void {
    this.uiService.toggleNewTaskComponent();
  }

  hasRoutes(route: string) {
    return this.router.url === route;
  }
}
