import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Transaction from '@/models/Transaction';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find()
    .sort({ date: -1 })
    .lean();
  return NextResponse.json(transactions);
}

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body = await request.json();
    const transaction = await Transaction.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  await dbConnect();
  try {
    const { _id, ...updateData } = await request.json();
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      _id,
      updateData,
      { new: true }
    );
    return NextResponse.json(updatedTransaction);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update transaction' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    await Transaction.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Transaction deleted' });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete transaction' },
      { status: 500 }
    );
  }
}
# refresh 1751729895
