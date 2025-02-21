export interface Order {
  id: string;
  customer_id: string;

  total_amount: number;
  status: number;
  description: string;
  created_at: string;
}
