export interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description?: string;
  type: 'income' | 'expense';
  category: string;
}

# refresh 1751729895
