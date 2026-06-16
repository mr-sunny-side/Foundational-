function createCell(row, col) {
    return {row, col, isMine: false, state: "hidden", mineCount: 0};
}

function createGrid(rows, cols) {
    const grid = [];
    let r = 0;
    let c = 0;

    while (r < rows) {
        grid.push([]);

        while (c < cols) {
            column = createGrid(r, c);
            grid[r].push(column)    // rowの配列にセルを追加
            c++;
        }
        r++;
    };

    return grid;
}
