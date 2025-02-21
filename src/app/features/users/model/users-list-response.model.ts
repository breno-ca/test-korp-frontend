import { User } from "./user.model";

export interface UsersListResponse {
  data: User[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}
