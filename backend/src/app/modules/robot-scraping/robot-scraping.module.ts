import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RobotScrapingComponent } from './components/robot-scraping/robot-scraping.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RobotScrapingComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RobotScrapingModule { }
