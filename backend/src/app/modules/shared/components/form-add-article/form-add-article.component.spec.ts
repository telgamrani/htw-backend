import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddArticleComponent } from './form-add-article.component';

describe('FormAddArticleComponent', () => {
  let component: FormAddArticleComponent;
  let fixture: ComponentFixture<FormAddArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAddArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
