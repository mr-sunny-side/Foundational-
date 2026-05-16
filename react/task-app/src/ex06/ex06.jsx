// 05-16
// 入力フォーム         完了
// クリア・追加ボタン   完了
// リスト               完了
// 完了・削除ボタン     完了

// コンポーネントの分割
// TaskItemでボタンの作成から

import { useState } from "react";

function Ex06() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);

    // 追加ボタンのロジック
    const handleAdd = () => {
        if (Input.trim() === "") return;
        const newTask = {id: Date.now(), text: Input, complite: false};
        setTask([...Tasks, newTask]);
        setInput("");
    }

    // 完了ボタンのロジック
    const handleToggle = (id) => {
        Tasks.map(task =>
            task.id === id
            ? {...task, complite: !task.complite}  
            //taskの要素をコピー、compliteを反転
            //この記述はオブジェクトなので{}で囲う
            : task
        );
    };

    // 削除ボタンのロジック
    const handleDelete = (id) => {
        Tasks.filter(task =>
            task.id !== id
        );
    };

    // リスト構造のロジック
    const handleList = () => {
        return (
            Tasks.map(task =>
                <li key={task.id}>
                    <span style={{textDecoration: task.complite ? "line-trough" : "none"}}>
                        {task.text}
                    </span>
                    <button onClick={() => handleToggle(task.id)}>完了</button>
                    <button onClick={() => handleDelete(task.id)}>削除</button>
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
                {handleList}
            </ul>
        </div>
    )
}