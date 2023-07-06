import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';
import { PlanetComponent } from './planet/planet.component';

const routes: Routes = [
  {
    path: 'people',
    component: PeopleComponent
  }, {
    path: 'people/:id',
    component: PersonComponent
  }, {
    path: 'planets/:id',
    component: PlanetComponent
  },
  { path: '**', redirectTo: 'people' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
