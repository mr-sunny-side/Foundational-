export function createCell(row, col) {
    return {row, col, isMine: false, state: "hidden", mineCount: 0};
}

export function createGrid(rows, cols) {
    const grid = [];
    let r = 0;

    while (r < rows) {
        grid.push([]);
        let c = 0;

        while(c < cols) {
            const cell = createCell(r, c);
            grid[r].push(cell);
            c++;
        }
        r++;
    }

    return grid;
}

export function placeMine(grid, mineCount) {
    let placedMine = 0;
    const rows = grid.length;
    const cols = grid[0].length;

    // オブジェクトを全てコピー
    const newGrid = grid.map(row => row.map(cell => ({...cell})));

    while (placedMine < mineCount) {
        let row, col    // ランダムに選択するセルの座標

        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols);
        } while (newGrid[row][col].isMine);

        newGrid[row][col] = {...newGrid[row][col], isMine: true};
        placedMine++;
    }

    return newGrid;
}
