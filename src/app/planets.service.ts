import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

export interface Planet {
  uid: string;
  climate: string;
  created: string;
  edited: string;
  diameter: string;
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  rotation_period: string;
  surface_water: string;
  terrain: string;
}

export interface PlanetResponse {
  result: {
    uid: string;
    properties: Omit<Planet, 'uid'>
  };
}

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  baseURL = 'https://www.swapi.tech/api/planets';

  constructor(private http: HttpClient) {}

  get(id: string): Observable<Planet> {
    return this.http.get<PlanetResponse>(this.baseURL + '/' + id)
      .pipe(map(res => ({ uid: res.result.uid, ...res.result.properties })));
  }
}
