import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Course } from "../model/course";

@Injectable({
  providedIn: "root",
})
export class CourseService {
  constructor(private http: HttpClient) {}

  loadCourses(): Observable<Course[]> {
    const params = new HttpParams().set("page", "1").set("pageSize", "5");
    return this.http
      .get<Course[]>("/api/courses", { params })
      .pipe(map((courses) => courses["payload"]));
  }
IIIi
  saveCourse(course: Course) {
    return this.http.put(`/api/courses/${course.id}`, course);
  }
}
