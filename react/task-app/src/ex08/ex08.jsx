// 05-22
// ex07の復習から
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { FilterButton } from "./TaskItem";

function Ex08() {
    const [Tasks, setTask] = useState([])
    const [Input, setInput] = useState("")
    const [Filter, setFilter] = useState("all")

    let filteredTask;
    if (Filter === "active") {
        filteredTask = Tasks.map(task => !task.complete)
    } else if (Filter === "complete") {
        filteredTask = Tasks.map(task => task.complete)
    } else {
        filteredTask = Tasks
    }

    return (
        <div>
            <TaskForm tasks={Tasks} set_task={setTask} input={Input} set_input={setInput}/>
            <FilterButton filter={Filter} set_filter={setFilter}/>
            <TaskList filtered_task={filteredTask} set_filter={setFilter}/>
        </div>
    );
}

export default Ex08
