import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductsService } from '../products.service';
import { ProductsListResponse } from '../model/products-list-response';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {

  products: Product[] = [];
  page = 1;
  total = 0;

  showModal = false;
  isEdit = false;

  productForm: Product = {
    id: '',
    name: '',
    price: 0,
    quantity: 0,
    created_at: ''
  };

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.page < 1) { this.page = 1 }

    this.productsService.getProducts(this.page).subscribe({
      next: (response: ProductsListResponse) => {
        this.products = response.data;
        this.total = Math.ceil(response.meta.total / response.meta.limit)
      },
      error: (error) => console.error('Erro ao carregar pedidos:', error)
    });
  }

  nextPage(): void {
    if (this.page >= this.total) { return }
    this.page++;
    this.loadProducts()
  }
  previousPage(): void {
    if (this.page <= 1) { return }
    this.page--;
    this.loadProducts()
  }

  onSubmit(): void {
    if (this.isEdit) {
      this.updateProduct();
    } else {
      this.createProduct();
    }
  }

  openCreateModal(): void {
    this.showModal = true;
    this.isEdit = false;
    this.productForm = {
      id: '',
      name: '',
      price: 0,
      quantity: 0,
      created_at: ''
    };
  }

  openEditModal(product: Product): void {
    this.showModal = true;
    this.isEdit = true;
    this.productForm = { ...product };
  }

  closeModal(): void {
    this.showModal = false
  }

  createProduct(): void {
    this.productsService.createProduct(this.productForm).subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
      },
      error: (error) => console.error('Erro ao criar produto:', error)
    });
  }

  updateProduct(): void {
    this.productsService.updateProduct(this.productForm).subscribe({
      next: () => {
        this.loadProducts();
        this.closeModal();
      },
      error: (error) => console.error('Erro ao atualizar produto:', error)
    });
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (error) => console.error('Erro ao excluir produto:', error)
    });
  }
}
