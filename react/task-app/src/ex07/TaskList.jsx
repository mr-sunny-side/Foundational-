import { DeleteButton, CompButton } from "./TaskItem"

function TaskList({tasks, set_task}) {
    return (
        tasks.map(task =>
            <li key={task.id}>
                <span style={{textDecoration: task.complete ? "line-through" : "none"}}>
                    {task.text}
                </span>
                <DeleteButton tasks={tasks} set_task={set_task} id={task.id}/>
                <CompButton tasks={tasks} set_task={set_task} id={task.id}/>
            </li>
        )
    );
}

export default TaskList;
