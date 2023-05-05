import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  constructor() { }

  get regiones(): string[] {
    return [...this._regiones];
  }
}
