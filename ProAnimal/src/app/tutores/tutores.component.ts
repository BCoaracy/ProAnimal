import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { iTutores } from '../models/tutores.model';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PersonaService } from '../services/persona.service'

@Component({
  selector: 'app-tutores',
  templateUrl: './tutores.component.html',
  styleUrls: ['./tutores.component.css']
})
export class TutoresComponent implements OnInit {

  tutores$: Observable<iTutores[]>;

  tutorForm = this.fb.group({
    Cpf: ['', [Validators.required]],
    Nome: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private pService: PersonaService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    let t: iTutores = this.tutorForm.value;
    console.log(t);
    this.addTutor(t);
  }

  addTutor(t: iTutores) {
    console.log('No addTutor: ' + t);
    this.pService.addTutor(t)
      .then(() => {
        this.snackBar.open('Tutor Adicionado.', 'OK', { duration: 2500 })
        this.tutorForm.reset({ Nome: '', CPF: '' });
      })
      .catch(() => {
        this.snackBar.open('Erro ao submeter o Tutor')
      })
  }
}
