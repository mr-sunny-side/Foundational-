import * as logic from "./logic.js"

function main() {
    const grid = logic.createGrid(logic.DEFAULT_ROWS, logic.DEFAULT_COL);
    const placedGrid = logic.placeMine(grid, logic.DEFAULT_MINE);
    console.log(placedGrid);
}

main();
