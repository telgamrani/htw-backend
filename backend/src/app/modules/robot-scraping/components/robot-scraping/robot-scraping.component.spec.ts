import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotScrapingComponent } from './robot-scraping.component';

describe('RobotScrapingComponent', () => {
  let component: RobotScrapingComponent;
  let fixture: ComponentFixture<RobotScrapingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotScrapingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotScrapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
