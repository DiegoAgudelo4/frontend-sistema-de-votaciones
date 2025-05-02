import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { MessageComponent } from '../../../../core/shared/modals/message/message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'Iniciar sesión';
  private loginservice = inject(LoginService);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.validateAuth();
    this.loginForm = this.fb.group({
      email: ['admin@example.com'],
      password: ['Clave_super_segura'],
      rememberMe: [false]
    });
  }
  private validateAuth() {
    this.loginservice.isAuth();

    if (this.loginservice.authenticated()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (!email || !password) {
      this.openMessageDialog("Se deben rellenar todos los campos");
      return;
    }
    this.loginservice.login(email, password).subscribe({
      next: (res) => {
        if (this.loginservice.authenticated()) {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Error de autenticación:', err);
      }
    });
  };


  onRegister() {
    alert('Formulario de registro TODO');
  };

  private openMessageDialog(mensaje: string) {
    this.dialog.open(MessageComponent, {
      data: mensaje
    });
  }
  get isLoading() {
    return this.loginservice.isLoading();
  }
}
