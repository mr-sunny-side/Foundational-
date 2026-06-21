// createTimer関数をコールバックで作り直す

// 全セルに対して、callbackを呼ぶ関数
function forEachCell(grid, callback) {
    for (const row of grid) {
        for (const cell of row) {
            callback(cell);
        }
    };
}

// 新しいグリッドとして返す
function transformGrid(grid, callback) {
    const newGrid = [];
    let i = 0;

    for (const row of grid) {
        newGrid.push([]);

        for (const cell of row) {
            const newCell = callback(cell);
            newGrid[i].push(newCell);
        }
        i++;
    };

    return newGrid;
}

function createCell(row, col) {
    return {row, col, isMine: false, state: "hidden", mineCount: 0};
}

function createGrid(rows, cols) {
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

function main() {
    const grid = createGrid(3, 3);

    // セルを全てopenにする
    const newGrid = transformGrid(
        grid, (cell) => {return {...cell, state: "open"}}
    );
    console.log(newGrid);

    // row + colが偶数のセルを地雷に変換
    const newGrid2 = transformGrid(
        grid,
        (cell) => {
            (cell.row + cell.col) % 2 === 0
            ? {...cell, isMine: true}
            : cell
        }
    );
    console.log(newGrid2);

}

main()
