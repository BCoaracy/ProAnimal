import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {iDoencas } from '../models/doencas.model';
import { Observable, from } from 'rxjs';
import { FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DoencasService } from '../shared/doencas.service';


@Component({
  selector: 'app-doencas',
  templateUrl: './doencas.component.html',
  styleUrls: ['./doencas.component.css']
})
export class DoencasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
