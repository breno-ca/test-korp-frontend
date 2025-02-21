import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SignIn } from '../model/signin.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  title = 'Login'
  signIn: SignIn = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  submit() {
    this.authService.signIn(this.signIn).subscribe({
      next: response => {
        this.router.navigate(['/dashboard'])
      },
      error: error => {
        console.error('Erro ao realizar login:', error);
      }
    })
  }
}
