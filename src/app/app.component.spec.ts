import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WikiService } from './wiki.service';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PageListComponent } from './page-list/page-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// class MockWikiService {
//   query: [
//     {
//       search: {
//         title: 'string';
//         snippet: 'string';
//         pageid: 1;
//       };
//     }
//   ];
// }

describe('AppComponent', () => {
  let wikiSeriveSpy: jasmine.SpyObj<WikiService>;

  beforeEach(async () => {
    wikiSeriveSpy = jasmine.createSpyObj('WikiService', ['search']);

    await TestBed.configureTestingModule({
      //adding ngbmodule deps
      imports: [RouterTestingModule, HttpClientTestingModule],

      //component deps
      declarations: [AppComponent, SearchBarComponent, PageListComponent],

      //indjector deps
      providers: [{ provide: WikiService, useValue: wikiSeriveSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('inital page should be 0', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.pages.length).toEqual(0);
  });

  it('make request to api', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    const data = {
      query: { search: [{ title: 'string', snippet: 'string', pageid: 1 }] },
    };

    wikiSeriveSpy.search.and.returnValue(of(data));

    app.onTermSearch('maytheu')

    const finalVal = app.pages.length;

    expect(finalVal).toEqual(1);
  });

  // it(`should have as title 'wiki'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  // const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('wiki app is running!');
  // });
});
