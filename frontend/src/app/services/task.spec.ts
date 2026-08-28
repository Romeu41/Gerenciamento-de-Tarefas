import { TestBed } from '@angular/core/testing';
import { Tasks } from '../pages/tasks/tasks';

describe('Tasks', () => {
  let service: Tasks;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tasks);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
