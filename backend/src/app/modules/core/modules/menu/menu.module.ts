import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { RoutingModule } from 'src/app/modules/routing/routing.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    RoutingModule
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
