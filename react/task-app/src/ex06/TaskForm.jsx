// 入力フォームのロジック
// クリアボタン
//　追加ボタンはtaskitemからインポート
import { DeleteButton } from "./TaskItem"

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
            <DeleteButton Tasks={Tasks} setTask={setTask} />
        </div>
    )
}
