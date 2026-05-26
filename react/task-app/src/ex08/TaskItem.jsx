import { useState } from "react";

// 追加ボタンのロジック
function AddButton({tasks, set_task, input, set_input}) {
    const handleAdd = () => {
        if (input.trim() === "") return;
        const new_task = {id: Date.now(), text: input, complete: false};
        set_task([...tasks, new_task]);
        set_input("");
    };

    return <button onClick={handleAdd}>追加</button>;
}

// 削除ボタンのロジック
// idと一致しないもので配列を作り直す
function DeleteButton({tasks, set_task, id}) {
    const handleDelete = () => {
        set_task(tasks.filter(
            task => task.id !== id
        ));
    };

    return <button onClick={handleDelete}>削除</button>;
}

// 完了ボタンのロジック
// idが一致するもののcompleteを反転させる
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
        <div>
            <button onClick={() => set_filter("all")}>全て</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("complete")}>完了済み</button>
        </div>
    )
}

function TaskItem({task, tasks, set_task}) {
    const [IsEditing, setIsEditing] = useState(false);   // 編集状態かを示す変数
    const [editText, setEditText] = useState(task.text); // 編集する際の文字列を管理する変数

    // 編集時、保存ボタンを押したときのロジック
    const handleSave = () => {
        if (editText.trim() === "") return;
        set_task(tasks.map(t =>
            t.id === task.id ? {...t, text: editText} : t   // タスク配列の指定アイテムを書き換え
        ));
        setIsEditing(false);
    };

    // 編集キャンセルボタンを押したときのロジック
    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <li key={task.id}>
            {IsEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleSave}>保存</button>
                    <button onClick={handleCancel}>キャンセル</button>
                </>
            ) : (
                <>
                    <span style={{textDecoration: task.complete ? "line-through" : "none"}}>
                        {task.text}
                    </span>
                    <button onClick={() => setIsEditing(true)}>編集</button>
                    <CompButton tasks={tasks} set_task={set_task} id={task.id}/>
                    <DeleteButton tasks={tasks} set_task={set_task} id={task.id}/>
                </>
            )}
        </li>
    )
}

export {AddButton, DeleteButton, CompButton, FilterButton, TaskItem}
