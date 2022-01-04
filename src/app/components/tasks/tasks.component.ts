import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

import { Task } from '../../interface/Task';
// import { TASKS } from 'src/app/mockTask'; connecting via service

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTask().subscribe((tasks) => (this.tasks = tasks));
  }

  onDeleteTask(task?: Task): void {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task?.id))
      );
  }

  onToggleTask(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  onSubmitTask(task: Task): void {
    this.taskService.newTask(task).subscribe((task) => this.tasks.push(task));
  }
}
