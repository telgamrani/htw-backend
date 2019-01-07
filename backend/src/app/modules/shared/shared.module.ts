import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LookComponent } from './components/look/look.component';
import { ArticleComponent } from './components/article/article.component';
import { RoutingModule } from '../routing/routing.module';
import { TitleCenterComponent } from './components/title-center/title-center.component';
import { FormAddArticleComponent } from './components/form-add-article/form-add-article.component';
import { LoaderIndicatorSpinnerComponent } from './components/loader-indicator-spinner/loader-indicator-spinner.component';

@NgModule({
  declarations: [LookComponent, ArticleComponent, TitleCenterComponent, FormAddArticleComponent, LoaderIndicatorSpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RoutingModule
  ],
  exports: [
    LookComponent,
    ArticleComponent,
    TitleCenterComponent,
    FormAddArticleComponent,
    LoaderIndicatorSpinnerComponent
  ]
})
export class SharedModule { }
