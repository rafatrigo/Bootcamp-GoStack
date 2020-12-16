import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulated: Balance, currentValue) => {
        if (currentValue.type === 'income') {
          // eslint-disable-next-line no-param-reassign
          accumulated.income += currentValue.value;
          // eslint-disable-next-line no-param-reassign
          accumulated.total += currentValue.value;
        } else {
          // eslint-disable-next-line no-param-reassign
          accumulated.outcome += currentValue.value;
          // eslint-disable-next-line no-param-reassign
          accumulated.total -= currentValue.value;
        }

        return accumulated;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
