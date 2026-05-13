//05-13 
// 自分の理解の範囲でフォームの作成から
// - 追加後にInputが空になる
// - 空文字は追加できない
// - 関数にして動作をまとめる

import { useState } from "react";

function Ex03d() {
    const [Input, setInput] = useState("")  // 入力フォームの文字表示
    const [Tasks, setTask] = useState([])   // タスクを保存する配列
    const NewTask = {id: Date.now(), text: Input}   // タスクの追加型

    return (
        <div>
            <input 
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <button onClick={() => setTask([...Tasks, NewTask])}>追加</button>
            <ul>
                {Tasks.map(task => <li key={task.id}>{task.text}</li>)}
            </ul>
        </div>
    )
}

export default Ex03d