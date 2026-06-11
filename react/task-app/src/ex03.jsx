import { useState } from "react";

function Ex03() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);

    // 追加ボタンを押したときの関数
    const handleAdd = () => {
        if (Input.trim() === "") return;    // 空文字ならスルー
        const newTask = {id: Date.now(), text: Input};   // 追加するタスクの型
        setTask([...Tasks, newTask]);   // 追加するタスクをリストに追加
        setInput("");                    // タスクを追加したらフォームをリセット
    };

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
                {Tasks.map(task => <li key={task.id}>{task.text}</li>)}
            </ul>
        </div>
    )
}

export default Ex03