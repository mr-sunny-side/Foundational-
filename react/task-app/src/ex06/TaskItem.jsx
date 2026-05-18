// 削除・完了ボタン

import { useState } from "react";

// 削除ボタンのロジック
function DeleteButton({Tasks, setTask, id}) {
    const handleDelete = () => {
        setTask(Tasks.filter(task => task.id !== id));
    };

    return <button onClick={handleDelete}>削除</button>;
}

// 完了ボタンのロジック
function CompButton({Tasks, setTask, id}) {
    const handleComp = () => {
        setTask(Tasks.map(task =>
            task.id === id
            ? {...task, complete: !task.complete}
            : task
        ));
    }

    return <button onClick={handleComp}>完了</button>
}

// 追加ボタンのロジック
function AddButton({Tasks, setTask, Input, setInput}) {
    const handleAdd = () => {
        if (Input.trim() === "") return;
        const newTask = {id: Date.now(), text: Input, complete: false};
        setTask([...Tasks, newTask]);
        setInput("");
    }

    return <button onClick={handleAdd}>追加</button>
}

export {DeleteButton, CompButton, AddButton}
