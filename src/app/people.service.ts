import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

export type People = {
  uid: string;
  name: string;
}[];

export interface PeopleResponse {
  results: People;
  total_pages: number;
}

export interface Person {
  uid: string;
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
}

export interface PersonResponse {
  result: {
    uid: string;
    properties: Omit<Person, 'uid'>
  };
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  baseURL = 'https://www.swapi.tech/api/people';

  constructor(private http: HttpClient) {}

  getAll(params: { page: string; limit: string; }) {
    return this.http.get<PeopleResponse>(this.baseURL, { params });
  }

  get(id: string): Observable<Person> {
    return this.http.get<PersonResponse>(this.baseURL + '/' + id)
      .pipe(map(res => {
        const homeworld = res.result.properties.homeworld;

        return {
          uid: res.result.uid,
          ...res.result.properties,
          homeworld: homeworld.substring(homeworld.lastIndexOf('/') + 1)
        };
      }));
  }
}
