import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListComponent } from './page-list.component';
import { By } from '@angular/platform-browser';

describe('PageListComponent', () => {
  let component: PageListComponent;
  let fixture: ComponentFixture<PageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the page length', () => {
    component.pages.length = 10;

    expect(component.pages.length).toEqual(10);
  });

  it('should update the template with the pages result ', () => {
    component.pages = [{ title: 'string', snippet: 'string', pageid: 1 }];

    fixture.detectChanges();

    const td = fixture.nativeElement.querySelector('td');

    expect(td.textContent).toContain('string');
  });

  // it('should generate correct number of element using ngFor', ()=>{
  //   const el = fixture.debugElement.query(By.directive(PageListComponent))

  //   component.pages.length=10
  //   console.log(component.pages.length, 'here', fixture.debugElement);

  //   const tableRows = el.queryAll(By.css('tr'))

  //   expect(tableRows.length).toEqual(component.pages.length)
  // })
});
