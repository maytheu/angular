import { TestBed } from '@angular/core/testing';

import { WikiService } from './wiki.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('WikiService', () => {
  let service: WikiService;
  let originalTimeout =jasmine.DEFAULT_TIMEOUT_INTERVAL;

  beforeEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;

    TestBed.configureTestingModule({
      providers: [WikiService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(WikiService);
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have search()', () => {
    // const service: WikiService = TestBed.get(WikiService);
    expect(service.search('google')).toBeTruthy();
  });

  // it('should make request', (done) => {
  //   // const service: WikiService = TestBed.get(WikiService);
  //    service.search('google').subscribe((res) => {
  //     expect(res.query.search.length).toBeGreaterThan(3);
  //     done()
  //   });
  // });
});
