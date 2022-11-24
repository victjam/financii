export interface Transaction {
  title: string | any;
  id?: string;
  icon?: string;
  amount: number;
  categoryId: string;
  type: string;
  userId: string;
  createdAt: string;
}
