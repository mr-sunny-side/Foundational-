function TaskItem({task}) {
    return <li key={task.id}>{task.text}</li>;
}

export default TaskItem