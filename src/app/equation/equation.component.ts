import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { delay, filter, scan } from 'rxjs/operators';
import { MathValidators } from '../math-validators';

@Component({
  selector: 'app-equation',
  templateUrl: './equation.component.html',
  styleUrls: ['./equation.component.css'],
})
export class EquationComponent implements OnInit {
  secondsPerSolution = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl(''),
    },
    [MathValidators.addition('answer', 'a', 'b')]
  );
  constructor() {}

  ngOnInit(): void {
    // const startTime = new Date();
    // let numSolved = 0;

    this.mathForm.statusChanges
      .pipe(
        filter((status) => status === 'VALID'),
        delay(300),
        scan(
          (acc) => {
            return {
              numSolved: acc.numSolved + 1,
              startTime: acc.startTime,
            };
          },
          { numSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(({ numSolved, startTime }) => {
        // numSolved += 1;
        this.secondsPerSolution =
          (new Date().getTime() - startTime.getTime()) / numSolved / 1000;

        this.mathForm.patchValue({
          a: this.randomNumber(),
          b: this.randomNumber(),
          answer: '',
        });
      });
  }

  get a() {
    return this.mathForm.value.a;
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
