import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { CountriesService } from '../../services/countries.service';
import { CountrySmall, Region } from '../../interfaces/country.interface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required],
  })

  // Llenar selectores
  public regiones: Region[] = []
  public countriesByRegion: CountrySmall[] = []

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) { }

  get regions(): Region[] {
    return this.countriesService.regions
  }

  ngOnInit(): void {
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

    this.onRegionChanged()

  }

  onRegionChanged(): void {
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap((_) => {
          this.myForm.get('pais')?.reset('')
        }),
        switchMap(region => this.countriesService.getCountriesForRegion(region))
      )
      .subscribe(countries => {
        this.countriesByRegion = countries
      })
  }

  guardar() {
    console.log(this.myForm.value);

  }

}
