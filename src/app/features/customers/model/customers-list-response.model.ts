import { Customer } from "./customers.model";

export interface CustomerListResponse {
  data: Customer[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}

export interface CustomerListNoPaginationResponse {
  data: Customer[];
}
