import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Task } from '../interface/Task';
// import { TASKS } from '../mockTask'; not needed again

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
    // return obeservable from a file
    // {  const tasks = of(TASKS);
    //   return tasks;
    // }

    // async with http
    return this.http.get<Task[]>(this.serverUrl);
  }

  // delete single task based on id
  deleteTask(task?: Task): Observable<Task> {
    const url = `${this.serverUrl}/${task?.id}`;
    return this.http.delete<Task>(url, this.httpOptions);
  }
}
