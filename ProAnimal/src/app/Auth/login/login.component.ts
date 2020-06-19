import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Observable } from 'rxjs';
import { User } from '../user';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  User$: Observable<User>;
  Authenticated$: Observable<boolean>;

  loginForm = this.fb.group({
    Uid: [undefined],
    email: ['', [Validators.required]],
    senha: ['', [Validators.required]],
    veterinario: [false, [Validators.required]],
    adminstrador: [false, [Validators.required]],
  })
  email: string;
  senha: string;
  cpf: string;
  mensagem: string;
  emailEnviado: boolean;
  administrador: boolean;
  veterinario: boolean;


  constructor(
    private authServ: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
  }

  logar() {
    this.email = this.loginForm.controls['email'].value;
    this.senha = this.loginForm.controls['senha'].value;

    try {
      if (this.email == undefined || this.senha == undefined) {
        this.mensagem = 'Usuário	ou	senha	vazios'
        return
      }
      this.authServ.login(this.email, this.senha)
        .subscribe((u) => {
          this.router.navigate(['/animais'])
        }, (erro => {
          let detalhes = '';
          switch (erro.code) {
            case 'auth/user-not-found': {
              detalhes = 'Não	existe	usuário	para	o	email	informado';
              break;
            }
            case 'auth/invalid-email': {
              detalhes = 'Email	inválido';
              break;
            }
            case 'auth/wrong-password': {
              detalhes = 'Senha	Inválida';
              break;
            }
            default: {
              detalhes = erro.message;
              break;
            }
          }
          this.mensagem = `Erro	ao	logar.	${detalhes}`;
        }));

    } catch (erro) {
      this.mensagem = 'Erro ao logar. Detalhes:  ${erro}';
    }
  }
  async	enviaLink() {
    const { value: email } = await Swal.fire({
      title: 'Informe	o	email	cadastrado',
      input: 'email',
      inputPlaceholder: 'email'
    })
    if (email) {
      this.authServ.resetPassword(email)
        .then(() => {
          this.emailEnviado = true;
          this.mensagem = `Email	enviado	para \n ${email}	\ncom	instruções	para	recuperação.`
        })
        .catch(erro => {
          this.mensagem = `Erro	ao	localizar	o	email.	Detahes	${erro.message}`
        })
    }
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  cadastrar() {
    this.router.navigate(['./Register/register']);
  }


}
