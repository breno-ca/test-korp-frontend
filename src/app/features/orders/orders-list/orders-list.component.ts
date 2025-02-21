import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { OrdersService } from '../orders.service';
import { OrdersListResponse } from '../model/orders-list-response.model';
import { CustomersService } from '../../customers/customers.service';
import { Customer } from '../../customers/model/customers.model';
import { CustomerListNoPaginationResponse, CustomerListResponse } from '../../customers/model/customers-list-response.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent {

  orders: Order[] = [];
  page = 1;
  total = 10

  showModal = false;
  isEdit = false;

  orderForm: Order = {
    id: '',
    description: '',
    total_amount: 0,
    status: 0,
    created_at: '',
    customer_id: ''
  };

  customers: Customer[] = []

  constructor(
    private ordersService: OrdersService,
    private customersService: CustomersService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadCustomers()
  }

  loadOrders(): void {
    if (this.page < 1) { this.page = 1 }

    this.ordersService.getOrders(this.page).subscribe({
      next: (response: OrdersListResponse) => {
        this.orders = response.data;
        this.total = Math.ceil(response.meta.total / response.meta.limit)
      },
      error: (error) => console.error('Erro ao carregar pedidos:', error)
    });
  }

  loadCustomers(): void {
    this.customersService.getCustomersForOrders().subscribe({
      next: (response: CustomerListNoPaginationResponse) => {
        this.customers = response.data;
      },
      error: (error) => console.error('Erro ao carregar pedidos:', error)
    });
  }

  nextPage(): void {
    if (this.page >= this.total) { return }
    this.page++;
    this.loadOrders()
  }
  previousPage(): void {
    if (this.page <= 1) { return }
    this.page--;
    this.loadOrders()
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.updateOrder();
    } else {
      this.createOrder();
    }
  }

  openCreateModal(): void {
    this.isEdit = false;
    this.showModal = true
    this.orderForm = {
      id: '',
      description: '',
      total_amount: 0,
      status: 0,
      created_at: '',
      customer_id: ''
    }
  }

  openEditModal(order: Order): void {
    this.isEdit = true;
    this.showModal = true;
    this.orderForm = { ...order };
  }

  closeModal(): void {
    this.showModal = false
  }

  onStatusChange(status: number): void {
    this.orderForm.status = +status;
  }

  createOrder(): void {
    this.ordersService.createOrder(this.orderForm).subscribe({
      next: () => {
        this.loadOrders()
        this.closeModal()
      },
      error: (error) => console.error('Erro ao criar pedido:', error)
    });
  }

  updateOrder(): void {
    this.ordersService.updateOrder(this.orderForm).subscribe({
      next: () => {
        this.loadOrders()
        this.closeModal()
      },
      error: (error) => console.error('Erro ao atualizar pedido:', error)
    });
  }

  deleteOrder(id: string) {
    this.ordersService.deleteOrder(id)
      .subscribe(_ => this.loadOrders());
  }
}
