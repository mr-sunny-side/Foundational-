// 05-16
// 入力フォーム         完了
// クリア・追加ボタン   完了
// リスト               完了
// 完了・削除ボタン     完了

// コンポーネントの分割
// TaskItemでボタンの作成から

import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Ex06() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);

    return (
        <div>
            <TaskForm
                Tasks={Tasks} setTask={setTask} Input={Input} setInput={setInput}
            />
            <ul>
                <TaskList Tasks={Tasks} setTask={setTask}/>
            </ul>
        </div>
    )
}

export default Ex06
