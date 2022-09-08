import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  courses//: Course[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const params = new HttpParams().set("page", "1").set("pageSize", "5");
    this.http
      .get("/api/courses", { params })
      .subscribe((val) => (this.courses = val['payload']));
  }
}
