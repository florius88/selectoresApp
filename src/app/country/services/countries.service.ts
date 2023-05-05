import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CountrySmall } from '../interfaces/country.interface';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  private baseUrl: string = 'https://restcountries.com/v3.1'
  /* private cors = require('cors') */

  constructor(private http: HttpClient) { }

  get regiones(): string[] {
    return [...this._regiones];
  }

  getCountriesForRegion(region: string): Observable<CountrySmall[]> {

    /* app.use(cors()); */
    const url: string = `${this.baseUrl}/region/${region}?fields=cca3,name}`
    return this.http.get<CountrySmall[]>(url)

  }

}
