import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../interface/Task';
import { TaskService } from './task.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskStoreService {
  private taskSubject = new BehaviorSubject<Task[]>([]);

  readonly tasks$ = this.taskSubject.asObservable();

  constructor(private taskService: TaskService) {
    this.getAllTask();
  }

  private getAllTask() {
    this.taskService
      .getTask()
      .pipe(tap((tasks) => this.taskSubject.next(tasks)))
      .subscribe();
  }

  deleteTask(task: Task) {
    const tasks = this.taskSubject.getValue();

    const index = tasks.findIndex((t) => t.id === task.id);

    const allTask = tasks.splice(0);

    allTask.splice(index, 1);

    this.taskSubject.next(allTask);

    return this.taskService.deleteTask(task);
  }

  updateTask(task: Task) {
    const tasks = this.taskSubject.getValue();

    const index = tasks.findIndex((t) => t.id === task.id);

    const updateTask: Task = { ...tasks[index], ...task };

    const allTask = tasks.splice(0);

    allTask[index] = updateTask;

    this.taskSubject.next(allTask);

    return this.taskService.updateTaskReminder(task);
  }

  newTask(task: Task) {
    const tasks = this.taskSubject.getValue();

    const allTask = tasks.splice(0);

    allTask.push(task);

    this.taskSubject.next(allTask);

    return this.taskService.newTask(task);
  }
}
