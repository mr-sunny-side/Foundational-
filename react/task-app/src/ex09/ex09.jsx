// 05-26
// 編集機能の追加から
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { FilterButton } from "./TaskItem";
import { useState } from "react";

function Ex09() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);
    const [Filter, setFilter] = useState("all")

    // フィルター状態によってタスク配列を制御
    let FilteredTasks;
    if (Filter === "active") {
        FilteredTasks = Tasks.filter(task => !task.complete)
    } else if (Filter === "complete") {
        FilteredTasks = Tasks.filter(task => task.complete)
    } else {
        FilteredTasks = Tasks
    }

    return (
        <div>
            <TaskForm tasks={Tasks} set_task={setTask} input={Input} set_input={setInput}/>
            <FilterButton filter={Filter} set_filter={setFilter}/>
            <TaskList filtered_tasks={FilteredTasks} tasks={Tasks} set_task={setTask}/>
        </div>
    )
}

export default Ex09;
