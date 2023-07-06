import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';

import { PlanetsService, Planet } from '../planets.service';

@Component({
  templateUrl: './planet.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class PlanetComponent implements OnInit, OnDestroy {
  planet: Planet | undefined;
  private subs: Subscription | undefined;

  constructor(private route: ActivatedRoute, private planetsService: PlanetsService) {}

  ngOnInit() {
    this.planetsService.get(this.route.snapshot.params['id'])
      .subscribe(planet => {
        this.planet = planet;
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
