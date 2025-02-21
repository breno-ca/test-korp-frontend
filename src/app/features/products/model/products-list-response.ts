import { Product } from "./product.model";

export interface ProductsListResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
  }
}
