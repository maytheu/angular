import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CourseCardComponent } from "./course-card/course-card.component";
import { HighlightedDirective } from "./directives/highlighted.directive";
import { CommonModule } from "@angular/common";
import { OppIfDirective } from './directives/opp-if.directive';

@NgModule({
  declarations: [AppComponent, CourseCardComponent, HighlightedDirective, OppIfDirective],
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
