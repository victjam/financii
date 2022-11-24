export interface Transaction {
  uid?: string;
  amount: string | number;
  categoryId: string;
  description: string;
  type: string;
  userUid: string;
  createdAt: Date;
}
