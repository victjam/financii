export interface Transaction {
  title: string | any;
  id?: string;
  icon?: string;
  amount: number;
  category: CategoryTransaction;
  type: string;
  userId: string;
  createdAt?: string;
  modifiedAt?: string;
}

export interface CategoryTransaction {
  id: string;
  title: string;
  icon: string;
  isDeleted?: boolean;
}
