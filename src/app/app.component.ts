import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { map } from "rxjs/operators";
import { CourseService } from "./service/course.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(private courses: CourseService) {}

  ngOnInit(): void {
   this.courses$ = this.courses.loadCourses()
  }
}
