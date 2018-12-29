import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { LookListModule } from './modules/look-list/look-list.module';
import { LookDetailModule } from './modules/look-detail/look-detail.module';
import { RoutingModule } from './modules/routing/routing.module';
import { LookAddModule } from './modules/look-add/look-add.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RoutingModule,
    CoreModule,
    LookListModule,
    LookDetailModule,
    LookAddModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
