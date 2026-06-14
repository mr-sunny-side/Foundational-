// ex02から

// 座標がグリッド内か返す
function IsInBounds(row, col, rows, cols) {
    const inRow = rows - row;
    const inCol = cols - col;

    // 列が0以下の場合を最初に弾く
    if (row <= 0 || col <= 0) {
        return false;
    } else if (inRow < 0 || inCol < 0) { // 座標が大きすぎる場合を弾く
        return false;
    } else {
        return true;
    };
}
