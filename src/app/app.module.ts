import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { OrderComponent } from './components/order/order.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoutingModule} from './modules/routing/routing.module';
import { UserPageComponent } from './components/user-page/user-page.component';
import {RouterModule} from '@angular/router';
import { MyDecimalPipe } from './components/post/my-decimal.pipe';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    OrderComponent,
    UserPageComponent,
    MyDecimalPipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
