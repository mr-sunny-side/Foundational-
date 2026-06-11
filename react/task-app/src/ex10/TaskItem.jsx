// 追加・削除・完了・フィルタ・リスト
import { useState } from "react";

const API_URL = "http://localhost:8000"

//formの追加ボタンのロジック
//awaitを使うことで処理が終わるまで待ち、順次実行する(fetchは元々非同期なので)
function AddButton({tasks, set_task, input, set_input}) {
    const handleAdd = async () => {
        if (input.trim() === "") return;

        const res = await fetch(`${API_URL}/tasks`, {   //リクエストの送信
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text: input}) // bodyとしてtaskをjsonに変換
        });
        const new_task = await res.json()
        set_task([...tasks, new_task])
        set_input("")
    };


    return <button onClick={handleAdd}>追加</button>
}

function DeleteButton({tasks, set_task, id}) {
    const handleDelete = () => {
        set_task(tasks.filter(
            task => task.id !== id
        ));
    };

    return <button onClick={handleDelete}>削除</button>;
}

function CompButton({tasks, set_task, id}) {
    const handleComp = () => {
        set_task(tasks.map(task =>
            task.id === id
            ? {...task, complete: !task.complete}
            : task
        ));
    };

    return <button onClick={handleComp}>完了</button>;
}

function FilterButton({filter, set_filter}) {
    return (
        <>
            <button onClick={() => set_filter("all")}>全て</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("complete")}>完了</button>
        </>
    )
}

// リスト内のロジック
//
function TaskItem({task, tasks, set_task}) {
    const [IsEditing, setIsEditing] = useState(false);
    const [EditText, setEditText] = useState(task.text)

    // 編集保存ボタンのロジック
    const handleSave = () => {
        if (EditText.trim() === "") return;
        set_task(tasks.map(t =>
            t.id === task.id
            ? {...t, text: EditText}
            : t
        ));
        setEditText(task.text)
        setIsEditing(false)
    }

    // 編集キャンセルボタンのロジック
    const handleCancel = () => {
        setEditText(task.text)
        setIsEditing(false)
    }

    return (
        <li key={task.id}>
            {IsEditing ? (
                <>
                    <input
                        type="text"
                        value={EditText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleCancel}>キャンセル</button>
                    <button onClick={handleSave}>保存</button>
                </>
            ) : (
                <>
                    <span style={{textDecoration: task.complete ? "line-through" : "none"}}>
                        {task.text}
                    </span>
                    <DeleteButton tasks={tasks} set_task={set_task} id={task.id}/>
                    <CompButton tasks={tasks} set_task={set_task} id={task.id}/>
                </>
            )}
        </li>
    );
}

export {AddButton, DeleteButton, CompButton, FilterButton, TaskItem}
