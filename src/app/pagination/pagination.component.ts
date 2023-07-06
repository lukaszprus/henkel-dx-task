import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

const range = (start: number, end: number) => [...Array(end - start)].map((v, i) => i + start);

const paginationRange = (page: number, offset: number, pagesTotal: number) => {
  let start;
  let end;

  if (pagesTotal <= 2 * offset + 1) {
    start = 1;
    end = pagesTotal;
  } else if (page - offset <= 0) {
    start = 1;
    end = 2 * offset + 1;
  } else if (page + offset > pagesTotal) {
    start = pagesTotal - 2 * offset;
    end = pagesTotal;
  } else {
    start = page - offset;
    end = page + offset;
  }

  return range(start, end + 1);
};

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class PaginationComponent implements OnChanges {
  @Input() page: number | undefined;
  @Input() pagesTotal: number | undefined;

  range: number[] | undefined;

  ngOnChanges() {
    if (typeof this.page === 'undefined' || typeof this.pagesTotal === 'undefined') {
      this.range = [];
    } else {
      this.range = paginationRange(this.page!, 3, this.pagesTotal);
    }
  }
}
