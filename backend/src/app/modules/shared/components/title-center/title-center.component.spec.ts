import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCenterComponent } from './title-center.component';

describe('TitleCenterComponent', () => {
  let component: TitleCenterComponent;
  let fixture: ComponentFixture<TitleCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TitleCenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
