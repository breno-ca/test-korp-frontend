import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ProductsListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
