export interface Transaction {
  title: string | any;
  id?: string;
  icon?: string;
  amount: string | number;
  categoryId: string;
  type: string;
  userId: string;
  createdAt: string;
}
