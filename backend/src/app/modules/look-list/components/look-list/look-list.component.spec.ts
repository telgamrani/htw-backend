import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookListComponent } from './look-list.component';

describe('LookListComponent', () => {
  let component: LookListComponent;
  let fixture: ComponentFixture<LookListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
