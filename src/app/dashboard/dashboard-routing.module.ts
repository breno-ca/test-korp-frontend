import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { OrdersListComponent } from '../features/orders/orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'orders',
        loadChildren: () => import('../features/orders/orders.module')
          .then(m => m.OrdersModule)
      },
      {
        path: 'customers',
        loadChildren: () => import('../features/customers/customers.module')
          .then(m => m.CustomersModule)
      },
      {
        path: 'suppliers',
        loadChildren: () => import('../features/suppliers/suppliers.module')
          .then(m => m.SuppliersModule)
      },
      {
        path: 'products',
        loadChildren: () => import('../features/products/products.module')
          .then(m => m.ProductsModule)
      },
      {
        path: 'users',
        loadChildren: () => import('../features/users/users.module')
          .then(m => m.UsersModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
