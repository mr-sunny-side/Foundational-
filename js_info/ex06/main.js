// createCell関数
// createGrid関数
// getNbor関数
// を実装し、ex06を開始

// 06-17
// place_mine関数の作成から

// セルを作成する関数
function create_cell(row, col) {
    return {row, col, is_mine: false, state: "hidden", mine_count: 0};
}

// グリッドを作成する関数
function create_grid(rows, cols) {
    const grid = [];
    let r = 0;

    while (r < rows) {
        grid.push([]);
        let c = 0;

        while (c < cols) {
            const column = create_cell(r, c);
            grid[r].push(column);
            c++;
        }
        r++;
    }

    return grid;
}

// グリッドを一次元配列にする関数
function all_cells(grid) {
    return grid.flat();
}

// グリッド内の地雷数を数える関数
function count_mine(grid) {
    const flat_grid = all_cells(grid);  // グリッドを一次元にする
    const mine_num = flat_grid.filter(c => c.is_mine).length;    // 地雷をフィルタ、数を出す

    return mine_num;
}

// 開放済みのセルの配列を返す
function open_cell(grid) {
    const flat_grid = all_cells(grid);
    const open_cells = flat_grid.filter(c => c.state === "open");

    return open_cells;
}

// 地雷以外のセルが開放済みならtrueを返す関数
function is_cleared(grid) {
    const flat_grid = all_cells(grid);  // グリッドを一次元にする
    const not_mine = flat_grid.filter(c => !is_mine);   // 地雷以外のセルをフィルタ

    return not_mine.every(c => c.state === "open");
}

// ランダムに地雷を配置する関数
function place_mines(grid, mine_count) {

    const new_grid = grid.map(row => row.map(cell => ({...cell})));
    // 独立した新しいオブジェクトを作成するために、セルまでコピーする

    const rows = new_grid.length;
    const cols = new_grid.length;

    let mines_placed = 0;

    // 地雷が必要数設置されるまでループ
    while (mines_placed < mine_count) {
        let row, col;

        // ランダムにセルを取得する
        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols)
        } while (new_grid[row][col].is_mine)

        // オブジェクトの変更の際は、安全性の観点から直接変更しない
        new_grid[row][col] = {...new_grid[row][col], is_mine: true};
        mine_count++;
    }

    return new_grid;
}

function main() {
    const grid = create_grid(9, 9);
    const mine_count = 6;
    console.log(grid);

    const placed_grid = place_mines(grid, mine_count);
    const placed_mines = count_mine(place_mines);


    console.log(place_mines);
}

main()
