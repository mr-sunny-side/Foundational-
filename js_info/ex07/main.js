// create_grid関数
// place_mine関数
// get_nbor関数

// 06-19
// place_mine関数の作成から

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
            const cell = create_cell(r, c);
            grid[r].push(cell)
            c++;
        }
        r++;
    }

    return grid;
}

// 隣接したセルを配列にして返す
function get_nbor(grid, row, col) {
    const neighbors = [];

    for (const r of [-1, 0, 1]) {
        for (const c of [-1, 0, 1]) {

            // 自分自身はスキップ
            if (r === 0 && c === 0) continue;

            // 隣接したセルの座標を取得
            const target_row = row + r;
            const target_col = col + c;

            // グリッドからはみ出た座標をスキップ
            if (target_row < 0 || grid.length <= target_row) continue;
            if (target_col < 0 || grid[0].length <= target_col) continue;

            neighbors.push(grid[target_row][target_col]);
        }
    }

    return neighbors;
}

function place_mine(grid, mine_num) {
    const new_grid = grid.map(row => row.map(cell => ({...cell}))); // グリッドをコピー

    const mine_placed = 0;  // 設置した地雷数

    // 行数とカラム数を取得
    const rows = grid.length;
    const cols = grid[0].length;

    // 地雷が設置し終わるまでループ
    while (mine_placed < mine_num) {
        let row, col;

        // ランダムでセルを取得、地雷だったら再取得
        do {
            row = Math.floor(Math.random() * rows);
            col = Math.floor(Math.random() * cols);
        } while (new_grid[row][col].is_mine)

        new_grid[row][col] = {...new_grid[row][col], is_mine: true};
        mine_placed++;
    }

    return new_grid;
}

function create_timer() {
    let start_time = 0;

    return {
        // 初期時刻を設定する
        start_or_reset() {
            start_time = Date.now();
            console.log(`start_time: ${Math.floor(start_time / 1000)}`);
        },
        // 現在経過時刻を取得する
        get_second() {
            const time_now = Date.now();
            const elapse = Math.floor((time_now - start_time) / 1000);
            console.log(`stop time: ${elapse}`);
            return elapse;
        },
    };
}

function create_mine_counter(total_mine) {
    let remaining = total_mine;

    return {
        place_flag() {remaining--;},
        remove_flag() {remaining++;},
        get_remaining() {return remaining;}
    };
}
