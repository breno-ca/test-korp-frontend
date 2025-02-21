import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class CustomersModule { }
