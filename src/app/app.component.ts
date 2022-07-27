import { Component, OnInit } from "@angular/core";
import { LoadingServiceService } from "./loading/loading-service.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [LoadingServiceService], //available to direct child but not to mat dialog ince its not a direct child of app
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  logout() {}
}
