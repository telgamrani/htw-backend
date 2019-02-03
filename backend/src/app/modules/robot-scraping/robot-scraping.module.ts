import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotScrapingComponent } from './components/robot-scraping/robot-scraping.component';
import { SharedModule } from '../shared/shared.module';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [RobotScrapingComponent],
  imports: [
    CommonModule,
    SharedModule,
    HighlightModule
  ]
})
export class RobotScrapingModule { }
