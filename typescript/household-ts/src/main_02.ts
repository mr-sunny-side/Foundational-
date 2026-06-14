import type { Transaction } from "./types";
// 型情報をインポートするときはtypeをつける

function main() {
    const data: Transaction[] = [
        {id: 1, amount: 300, label: "apple", date: "2026-06-01"},
        {id: 2, amount: 250, label: "banana", date: "2026-06-02"},
        {id: 3, amount: 100, label: "nuts", date: "2026-06-03"}
    ];

    for (const d of data) {
        console.log(d);
    }
}

main()
