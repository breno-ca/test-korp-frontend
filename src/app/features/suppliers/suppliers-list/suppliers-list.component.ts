import { Component } from '@angular/core';
import { Supplier } from '../model/suppliers.model';
import { SuppliersListResponse } from '../model/suppliers-list-response.model';
import { SuppliersService } from '../suppliers.service';

@Component({
  selector: 'app-suppliers-list',
  templateUrl: './suppliers-list.component.html',
  styleUrls: ['./suppliers-list.component.scss']
})
export class SuppliersListComponent {

  suppliers: Supplier[] = []
  page = 1;
  total = 10;

  showModal = false
  isEdit = false

  supplierForm: Supplier = {
    id: '',
    company_name: '',
    email: '',
    created_at: ''
  };

  constructor(private suppliersService: SuppliersService) { }

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    if (this.page < 1) { this.page = 1 }

    this.suppliersService.getSuppliers(this.page).subscribe({
      next: (response: SuppliersListResponse) => {
        this.suppliers = response.data;
        this.total = Math.ceil(response.meta.total / response.meta.limit)
      },
      error: (error) => console.error('Erro ao carregar pedidos:', error)
    });
  }

  nextPage(): void {
    if (this.page >= this.total) { return }
    this.page++;
    this.loadSuppliers()
  }
  previousPage(): void {
    if (this.page <= 1) { return }
    this.page--;
    this.loadSuppliers()
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.updateSupplier();
    } else {
      this.createSupplier();
    }
  }

  openCreateModal(): void {
    this.showModal = true;
    this.isEdit = false;
    this.supplierForm = {
      id: '',
      company_name: '',
      email: '',
      created_at: ''
    };
  }

  openEditModal(supplier: Supplier): void {
    this.showModal = true;
    this.isEdit = true;
    this.supplierForm = { ...supplier };
  }

  closeModal(): void {
    this.showModal = false;
  }

  createSupplier(): void {
    this.suppliersService.createSupplier(this.supplierForm).subscribe({
      next: () => {
        this.loadSuppliers();
        this.closeModal();
      },
      error: (error) => console.error('Erro ao criar cliente:', error)
    });
  }

  updateSupplier(): void {
    this.suppliersService.updateSupplier(this.supplierForm).subscribe({
      next: () => {
        this.loadSuppliers();
        this.closeModal();
      },
      error: (error) => console.error('Erro ao atualizar cliente:', error)
    });
  }

  deleteSupplier(id: string): void {
    this.suppliersService.deleteSupplier(id).subscribe({
      next: () => {
        this.loadSuppliers();
      },
      error: (error) => console.error('Erro ao excluir cliente:', error)
    });
  }
}
