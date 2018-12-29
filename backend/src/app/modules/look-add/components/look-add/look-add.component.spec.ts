import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAddComponent } from './look-add.component';

describe('LookAddComponent', () => {
  let component: LookAddComponent;
  let fixture: ComponentFixture<LookAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
