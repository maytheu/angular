import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { concatMap, finalize, tap } from "rxjs/operators";

//multiple instance of loading service
@Injectable()
export class LoadingServiceService {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  //dubugging purposes
  constructor() {
    console.log("Loading service created ...");
  }

  //subscribing to the behaviorarsubject which onl this component has accesss to
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null) //initialize the observable chain
      .pipe(
        tap(() => this.loadingOn()), //sideeffect that turns on the behaviour subject
        concatMap(() => obs$), //output the value similar to the observable
        finalize(() => this.loadingOff()) //turns off the behavioral subject
      );
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }
}
