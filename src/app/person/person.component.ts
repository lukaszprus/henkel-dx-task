import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { Subscription } from 'rxjs';

import { PeopleService, Person } from '../people.service';

@Component({
  templateUrl: './person.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PersonComponent implements OnInit, OnDestroy {
  person: Person | undefined;
  private subs: Subscription | undefined;

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.get(this.route.snapshot.params['id'])
      .subscribe(person => {
        this.person = person;
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}
