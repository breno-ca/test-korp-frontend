import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class OrdersModule { }
