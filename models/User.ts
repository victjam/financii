export interface User {
  name: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  emoji?: string;
  uid?: string;
  createdAt?: Date;
}
