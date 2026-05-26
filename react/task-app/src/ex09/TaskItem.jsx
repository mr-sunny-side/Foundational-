// 追加・削除・完了・フィルターボタンの作成
import { useState } from "react";

//formの追加ボタンのロジック
function AddButton({tasks, set_task, input, set_input}) {
    const handleAdd = () => {
        if (input.trim() === "") return;
        const new_task = {id: Date.now(), text: input, complete: false};
        set_task([...tasks, new_task]);
        set_input("");
    }

    return <button onClick={handleAdd}>追加</button>;
}

// 削除ボタンのロジック
// 削除対象以外のタスクで、配列を組み直す
function DeleteButton({tasks, set_task, id}) {
    const handleDelete = () => {
        set_task(tasks.filter(
            task => task.id !== id
        ));
    };

    return <button onClick={handleDelete}>削除</button>;
}

// 完了ボタンのロジック
// 対象のcompleteを反転させる
function CompButton({tasks, set_task, id}) {
    const handleComp = () => {
        set_task(tasks.map(task =>
            task.id === id
            ? {...task, complete: !task.complete}
            : task
        ));
    };

    return <button onClick={handleComp}>完了</button>
}

// フィルターボタンのロジック
// それぞれのボタンでフィルター状態を変更する
function FilterButton({filter, set_filter}) {
    return (
        <>
            <button onClick={() => set_filter("all")}>全て</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("complete")}>完了</button>
        </>
    )
}

function TaskItem({task, tasks, set_task}){
    const [IsEditing, setIsEditing] = useState(false);
    const [EditText, setEditText] = useState(task.text);

    // 編集時、保存ボタンを押したときのロジック
    // 現在のタスクを指定して、EditTextをtextに反映
    const handleSave = () => {
        if (EditText.trim() === "") return;
        set_task(tasks.map(t =>
            t.id === task.id ? {...t, text: EditText} : t   // 指定のタスクのテキストを変更
        ));
        setIsEditing(false);
    };

    // 編集キャンセルボタンを押したときのロジック
    // 単純に初期状態に戻す
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
                        value={EditText}
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
                    <DeleteButton tasks={tasks} set_task={set_task} id={task.id}/>
                    <CompButton tasks={tasks} set_task={set_task} id={task.id}/>
                </>
            )}
        </li>
    )
}

export {AddButton, DeleteButton, CompButton, FilterButton}
