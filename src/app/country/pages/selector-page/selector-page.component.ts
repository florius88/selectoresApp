import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],

  })

  // Llenar selectores
  regiones: string[] = []

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.countriesService.regiones
  }

  guardar() {
    console.log(this.myForm.value);

  }

}
