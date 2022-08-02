import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { LoadingServiceService } from "../loading/loading-service.service";
import { MessagesService } from "../messages/messages.service";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { CoursesService } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CourseStoreService {
  private courseSubject = new BehaviorSubject<Course[]>([]);

  course$: Observable<Course[]> = this.courseSubject.asObservable();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingServiceService,
    private messageService: MessagesService,
    private courses: CoursesService
  ) {
    this.loadAllCourses();
  }
  private loadAllCourses() {
    const loadCourses$ = this.courses.loadAllCourses().pipe(
      catchError((err) => {
        const message = "could not load courses";
        this.messageService.showErrors(message);
        console.log(message, err);
        return throwError(err); //immediatel emits err and terminate observable
      }),
      tap((courses) => this.courseSubject.next(courses))
    );

    this.loadingService.showLoaderUntilCompleted(loadCourses$).subscribe();
  }

  filterByCategory(catgory: string): Observable<Course[]> {
    return this.course$.pipe(
      map((courses) =>
        courses
          .filter((course) => course.category === catgory)
          .sort(sortCoursesBySeqNo)
      )
    );
  }

  saveCourse(courseID: string, changes: Partial<Course>): Observable<any> {
    //get the course from subject
    const courses = this.courseSubject.getValue();

    //find the id of the course
    const index = courses.findIndex((course) => course.id === courseID);

    //new courses update
    const newCourse: Course = { ...courses[index], ...changes };

    //new array courses
    const newCourses: Course[] = courses.splice(0);

    //replace the new index
    newCourses[index] = newCourse;

    //update the subject locally
    this.courseSubject.next(newCourses);

    return this.courses.saveCourse(courseID, changes).pipe(
      catchError((error) => {
        const message = "Course cannot be updated";
        this.messageService.showErrors(message);
        return throwError(error);
      })
    );
  }
}
