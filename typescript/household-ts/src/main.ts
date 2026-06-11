import type { Transaction } from "./types";
import type { transType } from "./types";

function getSign(type: transType) {
    switch (type) {
        case "income":
            console.log("is income.")
            return 1;
        case "expense":
            console.log("is expense.")
            return -1;
        default:
            console.log("type error")
            return 0;
    }
}

function main() {
    const data: Transaction[] = [
        {type: "expense", id: 1, amount: 300, label: "apple", date: "2026-06-01"},
        {type: "expense", id: 2, amount: 250, label: "banana", date: "2026-06-02"},
        {type: "income", id: 3, amount: 1000, label: "pocket money", date: "2026-06-03"}
    ];

    for (const d of data) {
        console.log(d);
        console.log(getSign(d.type));
    }

}

main()
