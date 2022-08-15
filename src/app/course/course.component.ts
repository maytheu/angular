import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import { combineLatest, Observable } from "rxjs";
import { Lesson } from "../model/lesson";
import { CoursesService } from "../services/courses.service";
import { map, startWith, tap } from "rxjs/operators";

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CourseComponent implements OnInit {
  // course$: Observable<Course>;

  // lessons$: Observable<Lesson[]>;

  data$: Observable<CourseData>;

  constructor(private route: ActivatedRoute, private courses: CoursesService) {}

  ngOnInit() {
    const courseId = +this.route.snapshot.paramMap.get("courseId");

    // this.course$ = this.courses.loadCorseById(courseId);

    // this.lessons$ = this.courses.loadLessonByCurseId(courseId.toString());

    const course$ = this.courses.loadCorseById(courseId).pipe(startWith(null))

    const lessons$ = this.courses.loadLessonByCurseId(courseId.toString()).pipe(startWith([]))

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => ({ course, lessons })),
      tap(console.log)
    );
  }
}
