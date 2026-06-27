import * as logic from "./logic.js"

const grid = logic.createGrid(9, 9);
// jsオブジェクトとしてグリッドを作成

function renderGrid(grid) {
    // セルを入れるグリッドエレメントを取得
    // エレメントの中身を初期化
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = "";

    // セルを取り出して、DOMに座標データと一緒に保存
    for (const row of grid) {
        for (const cellData of row) {
            // セルを入れるdivを作成
            // 作ったセルにcellクラスを付与
            // 座標データを付与
            // gridElementに追加

            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = cellData.row;
            cell.dataset.col = cellData.col;
            gridElement.appendChild(cell);
        }
    }
}

renderGrid(grid);
