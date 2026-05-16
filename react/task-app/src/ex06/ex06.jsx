// 05-16
// 入力フォーム         完了
// クリア・追加ボタン   完了
// リスト               削除ボタンの記述から
// 完了・削除ボタン     

import { useState } from "react";

function Ex06() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);

    // 追加ボタンのロジック
    const handleAdd = () => {
        if (Input.trim() === "") return;
        const newTask = {id: Date.now(), text: Input, complite: false}
        setTask([...Tasks, newTask])
        setInput("")
    }

    // 完了ボタンのロジック
    const handleToggle = (id) => {
        Tasks.map(task =>
            task.id === id
            ? {...task, complite: !task.complite}  
            //taskの要素をコピー、compliteを反転
            //この記述はオブジェクトなので{}で囲う
            : task
        )
    }

    // リスト構造のロジック
    const handleList = () => {
        return (
            Tasks.map(task =>
                <li key={task.id}>
                    <span style={{textDecoration: task.complite ? "line-trough" : "none"}}>
                        {task.text}
                    </span>
                    <button onClick={() => handleToggle(task.id)}>完了</button>
                    <button>削除</button>
                </li>
            )
        )
    }

    return (
        <div>
            <input
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <button onClick={handleAdd}>追加</button>
            <ul>

            </ul>
        </div>
    )
}