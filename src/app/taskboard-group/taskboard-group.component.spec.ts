import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskboardGroupComponent } from './taskboard-group.component';

describe('TaskboardGroupComponent', () => {
  let component: TaskboardGroupComponent;
  let fixture: ComponentFixture<TaskboardGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskboardGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskboardGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
