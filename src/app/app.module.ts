import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { OrderComponent } from './components/order/order.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {RoutingModule} from './modules/routing/routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import {RouterModule} from '@angular/router';
import { IconsModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    OrderComponent,
    UserPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RoutingModule,
    RouterModule,
    IconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
