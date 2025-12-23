import { TestBed } from '@angular/core/testing';

import { MapSericeService } from './map-serice.service';

describe('MapSericeService', () => {
  let service: MapSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
