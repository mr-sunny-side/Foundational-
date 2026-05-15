// 05-14
// ex04の復習から

import { useState } from "react";

function Ex05() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([])

    // 追加ボタンを押したときのロジック
    const handleAdd = () => {
        if (Input.trim() === "") return;
        const newTask = {id: Date.now(), text: Input, complete: false};
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

    // 完了ボタンを押したときのロジック
    // mapは配列を返す。
    // オブジェクトは{}で囲う
    const handleToggle = (id) => {
        setTask(Tasks.map(task =>
            task.id === id  // ここでどのタスクか指定
            ? {...Tasks, complete: !task.complete}  // 指定のタスクを完了に変更
            : task  // IDが一致しないタスクはそのまま配列に追加
        ));
    };


    // 追加されたタスクをリスト表示するロジック
    // 三項演算子で取り消し線を制御
    const handleList = () => {
        return (Tasks.map(task => 
            <li key={task.id}>
                <span style={{textDecoration: task.complete ? "line-through" : "none"}}>
                    {task.text}
                </span>
                <button onClick={() => handleDelete(task.id)}>削除</button>
                <button onClick={() => handleToggle(task.id)}>完了</button>
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