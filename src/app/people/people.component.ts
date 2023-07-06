import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { NEVER, Subscription, catchError, distinctUntilChanged, map, switchMap } from 'rxjs';

import { People, PeopleService } from '../people.service';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  templateUrl: './people.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent]
})
export class PeopleComponent implements OnInit, OnDestroy {
  people: People | undefined;
  page: number | undefined;
  pagesTotal: number | undefined;
  private subs: Subscription | undefined;

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) {}

  ngOnInit() {
    this.subs = this.route.queryParamMap
      .pipe(
        map(params => {
          const page = params.get('page');

          return page === null ? '1' : page;
        }),
        distinctUntilChanged(),
        switchMap(page =>
          this.peopleService.getAll({ page, limit: '10' })
            .pipe(
              catchError(() => NEVER), // TODO: Handle errors globally via an interceptor
              map(res => ({ page: Number(page), people: res.results, pagesTotal: res.total_pages }))
            ))
      )
      .subscribe(({ page, people, pagesTotal }) => {
        this.page = page;
        this.people = people;
        this.pagesTotal = pagesTotal;
      });
  }

  ngOnDestroy() {
    this.subs && this.subs.unsubscribe();
  }
}


