// タスクのリスト表示
// 削除・完了ボタン
import { DeleteButton, CompButton } from "./TaskItem";

function TaskList({Tasks, setTask}) {
    return (
        Task.map(
            <li key={Task.id}>
                <span style={{textDecoration: Task.complete ? "line-through" : "none"}}>
                    {Task.text}
                </span>
                <CompButton Tasks={Tasks} setTask={setTask}/>
                <DeleteButton Tasks={Tasks} setTask={setTask} />
            </li>
        )
    );
}

export default TaskList;
