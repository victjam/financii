export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  type: string;
  userUid: string;
  createdAt: Date;
}
