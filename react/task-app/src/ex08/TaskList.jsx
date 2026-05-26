// タスクリスト表示のロジック
import { DeleteButton, CompButton } from "./TaskItem";
import { TaskItem } from "./TaskItem";

function TaskList({filtered_tasks, set_task}) {
    return (
        filtered_tasks.map(task =>
            <TaskItem
                task={task}
                tasks={filtered_tasks}
                set_task={set_task}
            />
        ));
}

export default TaskList;
