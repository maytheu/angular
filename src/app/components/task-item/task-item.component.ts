import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../interface/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task?: Task;
  faTimes = faTimes;
  @Output() deleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() toggleTask: EventEmitter<Task> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(task?: Task): void {
    this.deleteTask.emit(task); //send to parent component item component
  }

  onToggle(): void {
    this.toggleTask.emit();
  }
}
