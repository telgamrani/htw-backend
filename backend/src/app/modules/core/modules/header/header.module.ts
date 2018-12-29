import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RoutingModule } from 'src/app/modules/routing/routing.module';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
