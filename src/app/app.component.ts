import { Component } from '@angular/core';
import {COURSES} from '../db-data';
import { Course } from './model/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
angCourse = COURSES[0]
angDeep = COURSES[1]
rxjCourse = COURSES[2]

viewCourse(course:Course){
  console.log(course);

}
}
