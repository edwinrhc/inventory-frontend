
export interface PageDto<T>{
  items: T[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}
