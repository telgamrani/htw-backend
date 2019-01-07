import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderIndicatorSpinnerComponent } from './loader-indicator-spinner.component';

describe('LoaderIndicatorSpinnerComponent', () => {
  let component: LoaderIndicatorSpinnerComponent;
  let fixture: ComponentFixture<LoaderIndicatorSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderIndicatorSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderIndicatorSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
