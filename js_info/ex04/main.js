// セルを作成し返す
function createCell(row, col) {
    return {row, col, inMine: false, state: "hidden", mineCount: 0};
}

// セルのステータスをopenにして返す(コピー)
function openCell(cell) {
    const copyCell = {...cell, state: "open"};
    return copyCell;
}

// 閉じたセルのフラッグstateをトグルする(コピー)
function toggleFlag(cell) {
    switch (cell.state) {
        case "hidden":
            let copyCell = {...cell, state: "flagged"};
            return copyCell;
        case "flagged":
            copyCell = {...cell, state: "hidden"};
            return copyCell;
        default:
            return cell;
    };
}

function main() {
    const cell = createCell(2, 3);
    console.log(cell);

    let copyCell = openCell(cell);
    console.log(copyCell);

    copyCell = toggleFlag(cell);
    console.log(copyCell);
}

main();
