import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { CountrySmall } from '../../interfaces/country.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
  })

  // Llenar selectores
  regiones: string[] = []
  paises: CountrySmall[] = []

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }

  ngOnInit(): void {
    this.regiones = this.countriesService.regiones

    // Cuando cambie la region
    /* Esta es la forma 'fea'
    this.myForm.get('region')?.valueChanges
      .subscribe(region => {
        console.log(region)
        this.countriesService.getCountriesForRegion(region)
          .subscribe(paises => {
            console.log(paises)
            this.paises = paises
          })
      }) */
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.myForm.get('pais')?.reset('')
        }),
        switchMap(region => this.countriesService.getCountriesForRegion(region))
      )
      .subscribe(paises => {
        this.paises = paises
      })
  }

  guardar() {
    console.log(this.myForm.value);

  }

}
