import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should update the favorite color in the component', fakeAsync(() => {
  //   const input = fixture.nativeElement.querySelector('input');
  //   const event = createNewEvent('input');

  //   input.value = 'Red';
  //   input.dispatchEvent(event);

  //   fixture.detectChanges();

  //   expect(component.inp).toEqual('Red');
  // }));
});
