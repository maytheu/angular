import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiServer = 'http://localhost:3000/products';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  create(product): Observable<Product> {
    return this.httpClient
      .post<Product>(this.apiServer, product, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getById(id): Observable<Product> {
    return this.httpClient
      .get<Product>(`${this.apiServer}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>(this.apiServer)
      .pipe(catchError(this.errorHandler));
  }

  update(id, product): Observable<Product> {
    return this.httpClient
      .put<Product>(`${this.apiServer}/${id}`, product, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  delete(id) {
    return this.httpClient
      .delete<Product>(`${this.apiServer}/${id}`, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
