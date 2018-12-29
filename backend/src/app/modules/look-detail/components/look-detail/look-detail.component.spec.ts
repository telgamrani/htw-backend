import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookDetailComponent } from './look-detail.component';

describe('LookDetailComponent', () => {
  let component: LookDetailComponent;
  let fixture: ComponentFixture<LookDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
