import { Component, OnInit } from '@angular/core';
import { TaskStoreService } from 'src/app/services/task-store.service';
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

  constructor(
    private taskService: TaskService,
    private taskStore: TaskStoreService
  ) {}

  ngOnInit(): void {
    this.taskService.getTask().subscribe((tasks) => (this.tasks = tasks));
    // this.taskStore.tasks$.subscribe((tasks) => (this.tasks = tasks))
  }

  onDeleteTask(task: Task): void {
    // this.taskStore.deleteTask(task).subscribe()

    // this.taskStore.tasks$.subscribe((tasks) => (this.tasks = tasks))

    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task?.id))
      );
  }

  onToggleTask(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
    // this.taskStore.updateTask(task).subscribe()
  }

  onSubmitTask(task: Task): void {
    // this.taskService.newTask(task).subscribe()
    // this.taskStore.tasks$.subscribe((tasks) => (this.tasks = tasks))

    this.taskService.newTask(task).subscribe((task) => this.tasks.push(task));
  }
}
