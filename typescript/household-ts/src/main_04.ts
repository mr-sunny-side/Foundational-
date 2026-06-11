import type { Transaction } from "./types";
import type { transType } from "./types";
import type { Summary } from "./types";

// 指定タイプをフィルターする
function filteredByType(trans: Transaction[], type: transType): Transaction[] {
    const filtered: Transaction[] = trans.filter(t => t.type === type);
    return filtered;
}

// 全件の合計金額を出す
function getTotalAmount(trans: Transaction[]): number {
    const total: number = trans.reduce((sum, t) => sum + t.amount, 0);
    return total;
}

// ラベルの文字列配列を返す
function getLabels(trans: Transaction[]): string[] {
    const labels: string[] = trans.map(t => t.label);
    return labels;
}

function getSummary(trans: Transaction[]): Summary {
    const income: Transaction[] = filteredByType(trans, "income");
    const expense: Transaction[] = filteredByType(trans, "expense");

    const incomeSum: number = getTotalAmount(income);
    const expenseSum: number = getTotalAmount(expense);

    const totalSum: number = incomeSum - expenseSum;

    return {
        incomeSum,
        expenseSum,
        totalSum
    }
}

function main() {
    const trans: Transaction[] = [
        {type: "expense", id: 1, amount: 300, label: "apple", date: "2026-06-01"},
        {type: "expense", id: 2, amount: 150, label: "banana", date: "2026-06-02"},
        {type: "income", id: 3, amount: 5000, label: "salary", date: "2026-06-03"},
        {type: "income", id: 4, amount: 100, label: "pocket money", date: "2026-06-04"}
    ];

    const summary: Summary = getSummary(trans);
    const labels: string[] = getLabels(trans)

    console.log("===Labels===");
    for (const l of labels) {
        console.log(l);
    };

    console.log("===Summary===");
    console.log(`Income: ${summary.incomeSum}`);
    console.log(`Expense: ${summary.expenseSum}`);
    console.log(`Total: ${summary.totalSum}`);
}

main();
