function createCellElement() {
    const cell = document.createElement("div"); // divを作成
    cell.classList.add("cell");                 // 作ったdivにクラスを指定
    return cell;
}

const cell = createCellElement()
const gridElement = document.getElementById("grid");
gridElement.appendChild(cell);
