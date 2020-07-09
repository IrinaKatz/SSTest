import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NewOrderComponent } from './user-orders/main-page/new-order/new-order.component';
import { OrderItemComponent } from './user-orders/main-page/order-item/order-item.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MainPageComponent } from './user-orders/main-page/main-page.component';
import { MyDecimalPipe } from './user-orders/main-page/new-order/my-decimal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NewOrderComponent,
    OrderItemComponent,
    MainPageComponent,
    MyDecimalPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  entryComponents: [NewOrderComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
