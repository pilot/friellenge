export class Pagination {
  count: number;
  pageSize: number;
  pageIndex: number;
  next: number | null;
  previous: null;

  constructor() {
    this.pageSize = 15;
    this.pageIndex = 1;
  }

  get nextPage(): number | boolean {
    return (this.next != null) ? this.pageIndex + 1 : false;
  }
}
