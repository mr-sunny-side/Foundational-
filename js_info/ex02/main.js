// ex02から

// 座標がグリッド内か返す
function IsInBounds(row, col, rows, cols) {
    const inRow = rows - row;
    const inCol = cols - col;

    // 座標は0から始まる前提
    // 列が0未満の場合を最初に弾く
    if (row < 0 || col < 0) {
        return false;
    } else if (inRow < 1 || inCol < 1) { // 座標が大きすぎる場合を弾く
        return false;
    } else {
        return true;
    };
}

// 地雷の密度を返す
function calcMine(mineCount, rows, cols) {
    const grid = rows * cols;           // 総マス数
    const mineRatio = mineCount / grid; // 地雷密度
    return mineRatio;
}

// マス数のフォーマットを返す
function gridSize(rows, cols) {
    return `${rows}✕${cols}`
}

function main() {
    const rows = 9;
    const cols = 9;
    const mineCount = 5;

    // IsInBoundsの確認
    let row = 0;
    let col = 8;
    console.log(IsInBounds(row, col, rows, cols));

    row = 1;
    col = -1;
    console.log(IsInBounds(row, col, rows, cols));

    // calcMIneの確認
    console.log(calcMine(mineCount, row, cols));

    //gridSizeの確認
    console.log(gridSize(rows, cols));
}

main()
