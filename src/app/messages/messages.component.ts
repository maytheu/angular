import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Message } from "../model/message";
import { tap } from "rxjs/operators";
import { MessagesService } from "./messages.service";

@Component({
  selector: "messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"],
})
export class MessagesComponent implements OnInit {
  errors$: Observable<string[]>;

  showMessage = false;

  constructor(private messagesService: MessagesService) {
    console.log("messages component created");
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showMessage = true))
    );
  }

  onClose() {
    this.showMessage = false;
  }
}
