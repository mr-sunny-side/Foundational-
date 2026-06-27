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
    };

    return grid;
}
