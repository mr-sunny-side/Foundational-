function createCell(row, col) {
    return {row, col, isMine: false, state: "hidden", mineCount: 0};
}

// グリッドを指定数作成する関数
function createGrid(rows, cols) {
    const grid = [];
    let r = 0;

    while (r < rows) {
        grid.push([]);
        let c = 0;  // cをリセット

        while (c < cols) {
            const column = createGrid(r, c);
            grid[r].push(column)    // rowの配列にセルを追加
            c++;
        }
        r++;
    };

    return grid;
}

// 指定セルの周りのセルを取得する関数
function getNeighbors(grid, row, col){
    const neighbors = [];

    for (const dRow of [-1, 0, 1]) {
        for (const dCol of [-1, 0, 1]) {

            // 自分自信をスキップ
            if (dRow === 0 && dCol === 0) continue;

            // 周りのセルの座標を取得
            const targetRow = row + dRow;
            const targetCol = col + dCol;

            // グリッド外の場合スキップ
            if (targetRow < 0 || targetRow >= grid.length) continue;
            if (targetCol < 0 || targetCol >= grid[0].length) continue;

            // 周囲のセルを保存
            neighbors.push(grid[targetRow][targetCol])
        }
    };

    return neighbors;
}

// 指定セルの周囲の地雷を数えて返す関数
function countMine(grid, row, col) {

    const neighbors = getNeighbors(grid, row, col);     // 周囲のセルを取得
    let mainNum = 0;

    for (const cell of neighbors) {
        if (cell.isMine === true) {
            mainNum++;
        }
    };

    return mainNum;
}

function main() {
    // グリッドを作成
    const grid = createGrid(9, 9);

    // 周囲のセルを取得
    const nbor1 = getNeighbors(grid, 0, 0);
    const nbor2 = getNeighbors(grid, 0, 4);
    const nbor3 = getNeighbors(grid, 8, 4);

    console.log("===getNbor===")
    console.log(nbor1);
    console.log(nbor2);
    console.log(nbor3);
    console.log("")

    // 地雷数のカウント
    const mineNum = countMine(grid, 4, 4);
    console.log("===mineNum===")
    console.log(mineNum);


}

main()
