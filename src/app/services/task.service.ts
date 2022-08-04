import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../interface/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private serverUrl = 'http://localhost:5000/tasks';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  //all task endpoint
  getTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.serverUrl);
  }

  // delete single task based on id
  deleteTask(task: Task): Observable<Task> {
    const url = `${this.serverUrl}/${task?.id}`;
    return this.http.delete<Task>(url, this.httpOptions);
  }

  // update reminder
  updateTaskReminder(task: Task): Observable<Task> {
    const url = `${this.serverUrl}/${task?.id}`;
    return this.http.put<Task>(url, task, this.httpOptions);
  }

  // new task
  newTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serverUrl, task, this.httpOptions);
  }
}
