import { SortBy } from 'src/app/app.constants';

export interface ISortOptions {
  label: string;
  value: string;
}

export interface ISortChange {
  sort: string;
  sortBy: `${SortBy}`;
}
