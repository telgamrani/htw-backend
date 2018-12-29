import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookListComponent } from './components/look-list/look-list.component';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { MenuModule } from '../core/modules/menu/menu.module';

@NgModule({
  declarations: [LookListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MenuModule
  ],
  exports: [
    LookListComponent
  ]
})
export class LookListModule { }
