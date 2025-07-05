export interface Transaction {
  _id: string;
  amount: number;
  date: string; // or Date if you're dealing with JS Date objects
  description?: string;
  type: 'income' | 'expense';
  category: string;
}

export type NewTransaction = Omit<Transaction, '_id' | 'date'>;
