// 削除・完了ボタン

import { useState } from "react";

// 削除ボタンのロジック
function DeleteButton({Tasks, setTask, id}) {
    Tasks.filter(task =>
        task.id !== id
    );
};

// 完了ボタンのロジック
function CompButton({Tasks, setTask, id}) {
    Tasks.map(task =>
        task.id === id  // idと一致するものが条件
        ? {...task, complete: !task.complete}   // 真の場合、完了判定を判定
        : task  // 対象タスク以外はそのままリストに追加
    );
};

// 追加ボタンのロジック
function AddButton({Tasks, setTask, Input, setInput}) {
    if (Input.trim() === "") return;
    const newTask = {id: Date.now(), text: Input, complete: false};
    setTask(...Tasks, newTask);
    setInput("");
}

export {DeleteButton, CompButton, AddButton}
