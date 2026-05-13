//05-13 
// アロー関数でまとめるところから
// - 追加後にInputが空になる    完了
// - 空文字は追加できない       
// - 関数にして動作をまとめる

import { useState } from "react";

function Ex03d() {
    const [Input, setInput] = useState("")  // 入力フォームの文字表示
    const [Tasks, setTask] = useState([])   // タスクを保存する配列

    return (
        <div>
            <input 
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <button onClick={() => {
                // 複数のスクリプトを書くときは、{}でまとめる
                const newTask = {id: Date.now(), text: Input}
                setTask([...task, newTask])
                setInput("")
            }}>追加</button>
            <ul>
                {/*JSXの中でスクリプトを書くときは、{}で囲う*/}
                {Tasks.map(task => <li key={task.id}>{task.text}</li>)}
            </ul>
        </div>
    )
}

export default Ex03d