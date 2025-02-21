import { Supplier } from "./suppliers.model";

export interface SuppliersListResponse {
  data: Supplier[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}
