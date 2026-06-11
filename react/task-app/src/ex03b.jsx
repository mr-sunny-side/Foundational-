import { useState } from "react";

function Ex03b() {
    const [inputText, setInputText] = useState("")
    // useStateは配列を返す
    // テキストの初期値""を指定
    // テキストの変更はsetInputTextで行う

    // valueは入力フォームに表示するもの
    // onChangeで変更内容をe(イベントオブジェクト)として受け取る
    // e.targetは、イベントが発生したHTML要素を指す
    // e.target.valueは、イベントで受け取った値
    return (
        <div>
            <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
             />
             <p>入力中: {inputText}</p>
             <button onClick={() => setInputText("")}>クリア</button>
        </div>
    )
}

export default Ex03b