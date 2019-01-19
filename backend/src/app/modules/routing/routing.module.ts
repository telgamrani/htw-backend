import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookListComponent } from '../look-list/components/look-list/look-list.component';
import { LookDetailComponent } from '../look-detail/components/look-detail/look-detail.component';
import { LookAddComponent } from '../look-add/components/look-add/look-add.component';
import { ScrapingRobotComponent } from '../scraping-robot/components/scraping-robot/scraping-robot.component';

const routes: Routes = [
  { path: '', redirectTo: 'look/list', pathMatch: 'full' },
  { path: 'look/list', component: LookListComponent },
  { path: 'look/detail/:id', component: LookDetailComponent },
  { path: 'look/add', component: LookAddComponent },
  { path : 'article/robot/scraping', component: ScrapingRobotComponent},
  { path: '**', component: LookListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class RoutingModule { }
