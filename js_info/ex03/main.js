
// セルの状態に応じた文字列を返す
function CellDisplay(state) {
    switch (state) {
        case "hidden":
            return "■";
            break;
        case "open":
            return " ";
            break;
        case "flagged":
            return "🚩";
            break;
        default:
            return "?";
    };
}

// 開けるセルかどうかboolを返す
// flaggedはfalse
function canOpen(state) {
    if (state === "hidden") {
        return true;
    } else {
        return false;
    };
}

function main() {
    let state = "hidden";
    console.log(CellDisplay(state));

    state = "open";
    console.log(CellDisplay(state));

    state = "flagged";
    console.log(CellDisplay(state));

    state = "test";
    console.log(CellDisplay(state));

    console.log("");
    state = "hidden";
    console.log(canOpen(state));

    state = "open";
    console.log(canOpen(state));
}

main();
