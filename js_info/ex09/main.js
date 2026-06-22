function sleep(ms) {
    const p = new Promise((resolve) => {
        setTimeout(() => {
            return resolve("完了");
        }, ms);
    });
}

async function showGameOver() {
    console.log("GAME OVER");
    await sleep(1000);
    console.log("スコアを集計中...");
    await sleep(2000);
    console.log("リトライしますか？");
}

async function openCellWithDelay(cells) {
    for (const cell of cells) {
        cell = {...cell, state: "open"};
        console.log(`{ row: ${cell.row}, col: ${cell.col} }を開放`)
        await sleep(100);
    }
}
