import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SuppliersListComponent
  ],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class SuppliersModule { }
