import { EditTask } from "./TaskItem";

function TaskList({filtered_tasks, tasks, set_task}) {
    return (
        filtered_tasks.map(task =>
            <EditTask task={task} tasks={tasks} set_task={set_task}/>
        )
    )
}

export default TaskList;
