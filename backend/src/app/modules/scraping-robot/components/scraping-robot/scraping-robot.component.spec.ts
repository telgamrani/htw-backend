import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapingRobotComponent } from './scraping-robot.component';

describe('ScrapingRobotComponent', () => {
  let component: ScrapingRobotComponent;
  let fixture: ComponentFixture<ScrapingRobotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrapingRobotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrapingRobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
