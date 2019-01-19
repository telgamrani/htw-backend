import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrapingRobotComponent } from './components/scraping-robot/scraping-robot.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ScrapingRobotComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ScrapingRobotModule { }
