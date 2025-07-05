"use client";

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import type { Transaction } from '@/types';
import { incomeCategories, expenseCategories } from '@/constants/categories';

export default function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch('/api/transactions');
        const data = await res.json();
        setTransactions(data.slice(0, 5));
      } catch {
        console.error('Failed to fetch transactions');
      }
    };

    fetchTransactions();
  }, []);

  const getCategoryLabel = (categoryValue: string) => {
    const allCategories = [...incomeCategories, ...expenseCategories];
    const found = allCategories.find(c => c.value === categoryValue);
    return found ? found.label : categoryValue;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          <div className="space-y-4">
            {transactions.map(transaction => (
              <div
                key={transaction._id}
                className="flex justify-between items-center p-3 border rounded"
              >
                <div>
                  <p
                    className={`font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {getCategoryLabel(transaction.category)}
                  </p>
                </div>
                <p className="text-sm text-gray-400">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
# refresh 1751729907
