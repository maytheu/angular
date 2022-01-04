import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/interface/Task';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  text: string = '';
  day: string = '';
  reminder: boolean = false;
  @Output() newTask: EventEmitter<Task> = new EventEmitter();

  // track the button component here
  showAddComponent: boolean = false;
  subscription: any = Subscription;

  constructor(private uiService: UiService) {
    this.subscription = uiService
      .onToggleComponent()
      .subscribe((val) => (this.showAddComponent = val));
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.text) return alert('Please enter a text');

    const addTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };

    this.newTask.emit(addTask);

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
