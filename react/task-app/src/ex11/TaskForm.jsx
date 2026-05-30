import { AddButton } from "./TaskItem"

function TaskForm({tasks, set_task, input, set_input}) {
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => set_input(e.target.value)}
            />
            <button onClick={() => set_input("")}>クリア</button>
            <AddButton tasks={tasks} set_task={set_task} input={input} set_input={set_input}/>
        </div>
    );
}

export default TaskForm;
