import { Component } from '@angular/core';
import { Customer } from '../model/customers.model';
import { CustomersService } from '../customers.service';
import { CustomerListResponse } from '../model/customers-list-response.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {

  customers: Customer[] = [];
  page = 1;
  total = 10;

  showModal = false;
  isEdit = false;

  customerForm: Customer = {
    id: '',
    name: '',
    email: '',
    phone: '',
    cpf_cnpj: '',
    status: 0,
    created_at: ''
  };

  constructor(private customersService: CustomersService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    if (this.page < 1) { this.page = 1 }

    this.customersService.getCustomers(this.page).subscribe({
      next: (response: CustomerListResponse) => {
        this.customers = response.data;
        this.total = Math.ceil(response.meta.total / response.meta.limit)
      },
      error: (error) => console.error('Erro ao carregar pedidos:', error)
    });
  }

  nextPage(): void {
    if (this.page >= this.total) { return }
    this.page++;
    this.loadCustomers()
  }
  previousPage(): void {
    if (this.page <= 1) { return }
    this.page--;
    this.loadCustomers()
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.updateCustomer();
    } else {
      this.createCustomer();
    }
  }

  openCreateModal(): void {
    this.showModal = true;
    this.isEdit = false;
    this.customerForm = {
      id: '',
      name: '',
      email: '',
      phone: '',
      cpf_cnpj: '',
      status: 0,
      created_at: ''
    };
  }

  openEditModal(customer: Customer): void {
    this.showModal = true;
    this.isEdit = true;
    this.customerForm = { ...customer };
  }

  closeModal(): void {
    this.showModal = false
  }

  onStatusChange(status: number): void {
    this.customerForm.status = +status
  }

  createCustomer(): void {
    this.customersService.createCustomer(this.customerForm).subscribe({
      next: () => {
        this.loadCustomers();
        this.closeModal();
      },
      error: (error) => console.error('Erro ao criar cliente:', error)
    });
  }

  updateCustomer(): void {
    this.customersService.updateCustomer(this.customerForm).subscribe({
      next: () => {
        this.loadCustomers();
        this.closeModal();
      },
      error: (error) => console.error('Erro ao atualizar cliente:', error)
    });
  }

  deleteCustomer(id: string) {
    this.customersService.deleteCustomer(id).subscribe({
      next: () => {
        this.loadCustomers();
      },
      error: (error) => { alert(error) }
    });
  }
}
