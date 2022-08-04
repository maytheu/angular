import { Component, OnInit } from "@angular/core";
import { LoadingServiceService } from "./loading/loading-service.service";
import { MessagesService } from "./messages/messages.service";
import { AuthStoreService } from "./services/auth-store.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  // providers: [LoadingServiceService, MessagesService], //available to direct child but not to mat dialog ince its not a direct child of app
})
export class AppComponent implements OnInit {
  constructor(    public authStoreService: AuthStoreService    ) {}

  ngOnInit() {}

  logout() {
this.authStoreService.logout()
  }
}
