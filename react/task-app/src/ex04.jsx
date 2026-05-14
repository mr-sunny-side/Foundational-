// 05-13
// とりあえず、ex03に削除ボタンを追加するところから
import { useState } from "react";

function Ex04() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);

    // 追加ボタンで、新しいタスクを追加する関数
    const handleAdd = () => {
        if (Input.trim() === "") return;
        const newTask = {id: Date.now(), text: Input};
        setTask([...Tasks, newTask]);
        setInput("");
    };

    // タスクの削除は、指定のタスクを削除した新しい配列を作ることで実現
    const handleDelete = (id) => {
        setTask(Tasks.filter(
            task => task.id !== id
        ))
    }

    // リストに追加されているタスクを表示する関数
    // jsxの結果はreturnする必要がある
    const handleList = () => {
        return (Tasks.map(task =>
            <li key={task.id}>
                {task.text}
                <button onClick={() => handleDelete(task.id)}>削除</button>
            </li>
        ));
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
                {/*JSXの中でレンダリング時に実行してほしいので()をつける */}
                {handleList()}
            </ul>
        </div>
    )
}

export default Ex04