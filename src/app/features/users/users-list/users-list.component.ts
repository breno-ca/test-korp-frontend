import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { UsersService } from '../users.service';
import { UsersListResponse } from '../model/users-list-response.model';
import { UserResponse } from '../model/user-response.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  users: User[] = [];
  page = 1;
  total = 10;

  showModal = false
  isEdit = false

  isAdmin = false

  userForm: User = {
    id: '',
    name: '',
    email: '',
    admin: false,
    created_at: ''
  }

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.me();
    this.loadUsers();
  }

  me(): void {
    this.usersService.me().subscribe({
      next: (response: UserResponse) => {
        this.isAdmin = response.data.admin;
      },
      error: (error) => console.error('Erro ao carregar usuários:', error)
    });
  }

  loadUsers(): void {
    if (this.page < 1) { this.page = 1 }

    this.usersService.getUsers(this.page).subscribe({
      next: (response: UsersListResponse) => {
        this.users = response.data;
        this.total = Math.ceil(response.meta.total / response.meta.limit)
      },
      error: (error) => console.error('Erro ao carregar usuários:', error)
    });
  }

  nextPage(): void {
    if (this.page >= this.total) { return }
    this.page++;
    this.loadUsers()
  }
  previousPage(): void {
    if (this.page <= 1) { return }
    this.page--;
    this.loadUsers()
  }

  openCreateModal(): void {
    this.showModal = true;
    this.isEdit = false;
    this.userForm = {
      id: '',
      name: '',
      email: '',
      admin: false,
      created_at: ''
    };
  }

  openEditModal(user: User): void {
    this.showModal = true;
    this.isEdit = true;
    this.userForm = { ...user };
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteUser(id: string): void {
    this.usersService.deleteUser(id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (error) => console.error('Erro ao excluir usuário:', error)
    });
  }
}
