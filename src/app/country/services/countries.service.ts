import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, combineLatest, map, of, tap } from 'rxjs';

import { Country, CountrySmall, Region } from '../interfaces/country.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania]
  private baseUrl: string = 'https://restcountries.com/v3.1'

  constructor(private http: HttpClient) { }

  get regions(): Region[] {
    return [...this._regions];
  }

  getCountriesForRegion(region: Region): Observable<CountrySmall[]> {
    // Si no viene region, devolver un observable vacío
    if (!region) return of([])

    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name,borders`
    return this.http.get<Country[]>(url)
      .pipe(
        map(countries => countries.map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        })))
      )

  }

  getCountryByAlphaCode(alphaCode: string): Observable<CountrySmall> {

    const url: string = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`
    return this.http.get<Country>(url)
      .pipe(
        map(country => ({
          name: country.name.common,
          cca3: country.cca3,
          borders: country.borders ?? []
        }))
      )
  }

  getCountryBordersByCodes(borders: string[]): Observable<CountrySmall[]> {
    if (!borders || borders.length === 0) return of([])

    const countriesRequests: Observable<CountrySmall>[] = []

    borders.forEach( code => {
      const request = this.getCountryByAlphaCode(code)
      countriesRequests.push(request)
    })

    return combineLatest(countriesRequests)

  }

}
