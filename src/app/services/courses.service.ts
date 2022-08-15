import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private http: HttpClient) {}

  loadAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>("/api/courses").pipe(
      map((res) => res["payload"]),
      shareReplay()
    );
  }

  filterByCategory(category: string) {}

  saveCourse(courseID: string, changes: Partial<Course>): Observable<any> {
    return this.http
      .put(`/api/courses/${courseID}`, changes)
      .pipe(shareReplay());
  }

  search(search: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: { filter: search, pageSize: "100" },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }

  loadCorseById(courseId: number): Observable<Course> {
    return this.http
      .get<Course>(`/api/courses/${courseId}`)
      .pipe(shareReplay());
  }

  loadLessonByCurseId(courseId: string): Observable<Lesson[]> {
    return this.http
      .get<Lesson[]>("/api/lessons", {
        params: { courseId, pageSize: "10000" },
      })
      .pipe(
        map((res) => res["payload"]),
        shareReplay()
      );
  }
}
