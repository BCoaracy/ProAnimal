import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { User } from '../../user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.fb.group({
    email: ['', [Validators.required]],
    cpf: ['', [Validators.required]],
    senha1: ['', [Validators.required, Validators.minLength(6)]],
    senha2: ['', [Validators.required, Validators.minLength(6)]],
    veterinario: [false, [Validators.required]],
    crmv: ['']
  },
    { validator: this.matchSenha });

  cpfValido: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  matchSenha(group: FormGroup) {
    if (group) {
      const senha1 = group.controls['senha1'].value;
      const senha2 = group.controls['senha2'].value;
      if (senha1 === senha2) {
        return null;
      }
    }
    return { matching: false };
  }

  checkCpf(event) {
    if (event.target.value == 11) {
      this.cpfValido = this.validarCpf(event.target.value);
    }
  }

  validarCpf(cpf: string): Boolean {
    let Soma;
    let Resto;
    Soma = 0;

    if (cpf == "00000000000")
      return false;
    for (let i = 1; i <= 9; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) {

      return false;
    }
    Soma = 0;
    for (let i = 1; i <= 10; i++)
      Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
    if ((Resto == 10) || (Resto == 11))
      Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) {
      this.snackBar.open('Número do cpf incorreto!', 'OK', { duration: 3000 })
      return false;
    }
    return true;

  }
  onSubmit() {
    if (this.registerForm.controls['veterinario'].value == true) {
      const newUser: User = {
        email: this.registerForm.controls['email'].value,
        senha: this.registerForm.controls['senha1'].value,
        cpf: this.registerForm.controls['cpf'].value,
        veterinario: this.registerForm.controls['veterinario'].value,
        admin: false,
        crmv: this.registerForm.controls['crmv'].value
      }
      this.authService.register(newUser)
        .subscribe(
          (u) => {
            this.snackBar.open('Você foi registrado com sucesso!', 'Ok', { duration: 4500 }
            );
            this.router.navigate(['./login']);
          },
          (error) => {
            console.log(error);
            this.snackBar.open('Ocorreu um erro ao registrar o usuário! Tente novamente mais tarde!', 'Ok', { duration: 4500 }
            );
          }
        );
    } else {
      const newUser: User = {
        email: this.registerForm.controls['email'].value,
        senha: this.registerForm.controls['senha1'].value,
        cpf: this.registerForm.controls['cpf'].value,
        veterinario: this.registerForm.controls['veterinario'].value,
        admin: false,
      }
      this.authService.register(newUser)
        .subscribe(
          (u) => {
            this.snackBar.open('Você foi registrado com sucesso!', 'Ok', { duration: 4500 }
            );
            this.router.navigate(['./login']);
          },
          (error) => {
            console.log(error);
            this.snackBar.open('Ocorreu um erro ao registrar o usuário! Tente novamente mais tarde!', 'Ok', { duration: 4500 }
            );
          }
        );
    }
  }
}
