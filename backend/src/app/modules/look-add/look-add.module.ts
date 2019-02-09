import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookAddComponent } from './components/look-add/look-add.component';
import { SharedModule } from '../shared/shared.module';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [LookAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    HighlightModule
  ]
})
export class LookAddModule { }
