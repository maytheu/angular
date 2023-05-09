import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a class of box', () => {
    const el = fixture.debugElement.query(By.css('.box'));
    expect(el).toBeTruthy();
  });

  it('should have onInput() to be undefined', () => {
    expect(component.onInput('app')).toBeUndefined();
  });

  it('should update the term value after calling onInput()', () => {
    const initialVal = component.term
    component.onInput('app')
    const updatedVal = component.term
    expect(updatedVal).not.toEqual(initialVal)
  });

  // it('should have a formfield', () => {
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   console.log(compiled);
  //   expect(compiled.ATTRIBUTE_NODE);
  // });
});
