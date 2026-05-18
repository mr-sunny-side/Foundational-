// 入力フォームのロジック
// クリアボタン
//　追加ボタンはtaskitemからインポート

import { AddButton } from "./TaskItem"

function TaskForm({Input, setInput, Tasks, setTask}) {

    // 追加ボタンのロジック
    return (
        <div>
            <input
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <AddButton
                Tasks={Tasks} setTask={setTask} Input={Input} setInput={setInput}
            />
        </div>
    )
}

export default TaskForm;
