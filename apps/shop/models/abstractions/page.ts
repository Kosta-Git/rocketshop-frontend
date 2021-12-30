export interface Page<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalValues: number;
  nextPage?: number;
}

export function emptyPage<T>(): Page<T> {
  return {
    data: new Array<T>(),
    pageNumber: 0,
    pageSize: 0,
    totalPages: 0,
    totalValues: 0,
  };
}
