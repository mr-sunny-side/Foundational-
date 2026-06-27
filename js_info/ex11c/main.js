import * as logic from "./logic.js"

const DEFAULT_ROWS = 9;
const DEFAULT_COLS = 9;
const DEFAULT_MINE = 10;

const grid = logic.createGrid(DEFAULT_ROWS, DEFAULT_COLS);
const placedGrid = logic.placeMine(grid, DEFAULT_MINE);

function renderGrid(placedGrid) {
    // HTMLに在るID=gridのエレメントを取得
    // エレメントの中身を初期化
    const gridElement = document.getElementById("grid")
    gridElement.innerHTML = "";

    for (const row of placedGrid) {
        for (const cellData of row) {
            // セル用のdivを作成
            // クラスを付与
            // 座標を付与
            // gridElementに追加

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = cellData.row;
            cell.dataset.col = cellData.col;

            // 地雷なら地雷クラスを付与
            if (cellData.isMine === true) {
                cell.classList.add("mine");
            }

            // openならopenクラスを付与
            if (cellData.state === "open") {
                cell.classList.add("open");
            }

            gridElement.appendChild(cell)
        }
    }
}

renderGrid(placedGrid);
