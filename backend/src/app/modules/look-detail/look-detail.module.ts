import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookDetailComponent } from './components/look-detail/look-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LookDetailComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LookDetailComponent
  ]
})
export class LookDetailModule { }
