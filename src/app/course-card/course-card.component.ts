import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Course } from "../model/course";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.css"],
})
export class CourseCardComponent implements OnInit {
  @Input() course: Course;
  @Input() cardIndex: number;

  @Output() onView = new EventEmitter<Course>();

  constructor() {}

  ngOnInit(): void {}

  onClickViewed() {
    this.onView.emit(this.course);
  }

  cardClass() {
    console.log(this.course.category);

    return { beginner: this.course.category === "BEGINNER" };
  }
}
