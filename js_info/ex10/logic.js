export const DEFAULT_ROWS = 9;
export const DEFAULT_COL = 9;
export const DEFAULT_MINE = 10;

export function createCell(row, col) {
    return {row, col, isMine: false, state: "hidden", mineCount: 0};
}

export function createGrid(rows, cols) {
    const grid = [];
    let r = 0;

    while (r < rows) {
        grid.push([]);
        let c = 0;

        while (c < cols) {
            const cell = createCell(r, c);
            grid[r].push(cell);
            c++;    // 数を数える変数なので、colを最終的に超えてもいい
        }
        r++;
    }

    return grid;
}

export function placeMine(grid, mineCount) {
    const newGrid = grid.map(row => row.map(cell => ({...cell})));
    // グリッドのセルオブジェクトまでコピー

    let placedMine = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    while (placeMine < mineCount) {
        let row, col;

        // 地雷でないセルを取得するまでループ
        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols);
        } while (newGrid[row][col].isMine)

        newGrid[row][col] = {...newGrid[row][col], isMine: true};
        placeMine++;
    }

    return newGrid;
}

export function isCleared(grid) {
    const flatGrid = grid.flat();   // 配列を一次元にする
    const notMine = flatGrid.filter(cell => !cell.isMine);  // 地雷以外のセルをフィルタ
    const clearBool = notMine.every(cell => cell.state === "open");
    return clearBool;
}
