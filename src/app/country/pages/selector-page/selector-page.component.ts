import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, switchMap, tap } from 'rxjs';

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
    border: ['', Validators.required],
  })

  // Llenar selectores
  public regiones: Region[] = []
  public countriesByRegion: CountrySmall[] = []
  public borders: string[] | undefined = []

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
    this.onCountryChanged()

  }

  onRegionChanged(): void {
    this.myForm.get('region')?.valueChanges
      .pipe(
        // Tambien puede ser con this.myForm.get('country')!.setValue('')
        tap((_) => { this.myForm.get('country')!.reset('') }),
        tap(() => this.borders = []),
        switchMap(region => this.countriesService.getCountriesForRegion(region))
      )
      .subscribe(countries => {
        this.countriesByRegion = countries
      })
  }

  onCountryChanged(): void {
    this.myForm.get('country')?.valueChanges
      .pipe(
        // Tambien puede ser con this.myForm.get('border')!.setValue('')
        tap((_) => { this.myForm.get('border')!.reset('') }),
        // Si no pasa este filtro, no hace nada más de lo que viene a continuación
        filter((value: string) => value.length > 0 ),
        switchMap(alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode))
      )
      .subscribe(country => {
        this.borders = country.borders
      })
  }

  guardar() {
    console.log(this.myForm.value);

  }

}
