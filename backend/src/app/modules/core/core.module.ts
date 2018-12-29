import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './modules/header/header.module';
import { SubHeaderModule } from './modules/sub-header/sub-header.module';
import { MenuModule } from './modules/menu/menu.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HeaderModule,
    SubHeaderModule,
    MenuModule
  ],
  exports: [
    HeaderModule,
    SubHeaderModule,
    MenuModule
  ]
})
export class CoreModule { }
