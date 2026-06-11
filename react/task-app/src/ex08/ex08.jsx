// 05-22
// エラー修正から

import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { FilterButton } from "./TaskItem";

function Ex08() {
    const [Tasks, setTask] = useState([])
    const [Input, setInput] = useState("")
    const [Filter, setFilter] = useState("all")

    // フィルタリングロジック
    // 指定のものをfilterメソッドで取り出す
    let filteredTasks;
    if (Filter === "active") {
        filteredTasks = Tasks.filter(task => !task.complete)
    } else if (Filter === "complete") {
        filteredTasks = Tasks.filter(task => task.complete)
    } else {
        filteredTasks = Tasks
    }

    return (
        <div>
            <TaskForm tasks={Tasks} set_task={setTask} input={Input} set_input={setInput}/>
            <FilterButton filter={Filter} set_filter={setFilter}/>
            <TaskList filtered_tasks={filteredTasks} tasks={Tasks} set_task={setTask}/>
        </div>
    );
}

export default Ex08
