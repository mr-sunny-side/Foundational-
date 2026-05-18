// タスクのリスト表示
// 削除・完了ボタン
import { DeleteButton, CompButton } from "./TaskItem";

function TaskList({Tasks, setTask}) {
    return (
        Tasks.map(task =>
            <li key={task.id}>
                <span style={{textDecoration: Task.complete ? "line-through" : "none"}}>
                    {task.text}
                </span>
                <CompButton Tasks={Tasks} setTask={setTask} id={task.id}/>
                <DeleteButton Tasks={Tasks} setTask={setTask} id={task.id}/>
            </li>
        )
    );
}

export default TaskList;
