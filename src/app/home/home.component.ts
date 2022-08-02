import { Component, OnInit } from "@angular/core";
import { Course, sortCoursesBySeqNo } from "../model/course";
import { interval, noop, Observable, of, throwError, timer } from "rxjs";
import {
  catchError,
  delay,
  delayWhen,
  filter,
  finalize,
  map,
  retryWhen,
  shareReplay,
  tap,
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { CourseDialogComponent } from "../course-dialog/course-dialog.component";
import { CoursesService } from "../services/courses.service";
import { LoadingServiceService } from "../loading/loading-service.service";
import { MessagesService } from "../messages/messages.service";
import { CourseStoreService } from "../services/course-store.service";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;

  constructor(
    private courses: CoursesService,
    private loadingService: LoadingServiceService,
    private messageService: MessagesService,
    private courseStore: CourseStoreService
  ) {}

  ngOnInit() {
    this.reloadComponent();

    // this.http.get('/api/courses')
    //   .subscribe(
    //     res => {

    //       const courses: Course[] = res["payload"].sort(sortCoursesBySeqNo);

    //       this.beginnerCourses = courses.filter(course => course.category == "BEGINNER");

    //       this.advancedCourses = courses.filter(course => course.category == "ADVANCED");

    //     });
  }

  reloadComponent() {

    this.beginnerCourses$ = this.courseStore.filterByCategory('BEGINNER')


    this.advancedCourses$ = this.courseStore.filterByCategory('ADVANCED')

    //call the loading service
    // this.loadingService.loadingOn();


    /**not valid since we rea now using the statsful store
    const courses$ = this.courses.loadAllCourses().pipe(
      map((courses) => courses.sort(sortCoursesBySeqNo)),
      catchError((err) => {
        const message = "could not load courses";
        this.messageService.showErrors(message);
        console.log(message, err);
        return throwError(err); //immediatel emits err and terminate observable
      })
      // finalize(() => this.loadingService.loadingOff())
    );

    //using a more consice loading indicator
    const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$);

    this.beginnerCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "BEGINNER")
      )
    );

    this.advancedCourses$ = loadCourses$.pipe(
      map((courses) =>
        courses.filter((course) => course.category === "ADVANCED")
      )
    );
    */
  }
}
