import { TaskItem } from "./TaskItem";

function TaskList({filtered_tasks, tasks, set_task}) {
    return (
        filtered_tasks.map(task =>
            <TaskItem task={task} tasks={tasks} set_task={set_task}/>
        )
    );
}

export default TaskList;
