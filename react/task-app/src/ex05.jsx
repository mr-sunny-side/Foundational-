// 05-14
// ex04の復習から

import { useState } from "react";

function Ex05() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([])

    // 追加ボタンを押したときのロジック
    const handleAdd = () => {
        if (Input.trim() === "") return;
        const newTask = {id: Date.now(), text: Input};
        setTask([...Tasks, newTask]);
        setInput("");
    };

    // 削除ボタンを押したときのロジック
    // 指定のid以外のタスクを再追加する
    const handleDelete = (id) => {
        setTask(Tasks.filter(
            task => task.id !== id
        ))
    };

    //　追加されたタスクをリスト表示するロジック
    const handleList = () => {
        return (Tasks.map(task => 
            <li key={task.id}>
                {task.text}
                <button onClick={() => handleDelete(task.id)}>削除</button>
            </li>
        ))
    };

    return (
        <div>
            {/*入力フォーム*/}
            <input 
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <button onClick={handleAdd}>追加</button>
            <ul>
                {handleList()}
            </ul>
        </div>
    )
}

export default Ex05