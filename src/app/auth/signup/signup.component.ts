import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SignUp } from '../model/signup.model';
import { SignUpResponseError } from '../model/signup-response.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  signUp: SignUp = { name: '', email: '', password: '' }
  confirmPassword = ''
  showSuccessMessage = false
  showErrorMessage = ''

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    if (this.signUp.password !== this.confirmPassword) {
      this.showErrorMessage = 'As senhas não coincidem. Por favor, verifique.';
      console.error('As senhas não coincidem.');
      return
    }
    this.showErrorMessage = '';


    this.authService.signUp(this.signUp).subscribe({
      next: response => {
        if (response.code === 201) {
          this.showSuccessMessage = true;
          setTimeout(() => { this.router.navigate(['/auth/signin']) }, 3000);
        }
      },
      error: error => {
        const errorResponse = error.error as SignUpResponseError;

        if (errorResponse.code === 422 && errorResponse.message === 'email already registered') {
          this.showErrorMessage = 'Este e-mail já está cadastrado.';
          return
        }
        this.showErrorMessage = 'Ocorreu um erro ao realizar o cadastro. Tente novamente.';
        console.error('Erro ao realizar cadastro:', error);
      },
    });
  }
}
