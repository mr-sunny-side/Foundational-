export type transType = "income" | "expense";

export interface Transaction {
    type: transType;
    id: number;
    amount: number;
    label: string;
    date: string;
}

export interface Summary {
    incomeSum: number;
    expenseSum: number;
    totalSum: number;
}
