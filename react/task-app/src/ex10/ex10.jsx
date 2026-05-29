// 05-28
// ex09の復習から

import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { FilterButton } from "./TaskItem";

function Ex10() {
    const [Tasks, setTask] = useState([]);
    const [Input, setInput] = useState("");
    const [Filter, setFilter] = useState("all")

    useEffect(() => {
        fetch("http://localhost:8000/tasks")   //fastAPIからリスト情報を取得
            .then(res => res.json())        //取得したリスト情報をjsonに変換
            .then(data => setTask(data))    //取得データをリストに追加
    }, [])                                  //第二引数で初期表示のときだけ実行

    // 進捗度でフィルタ済みのタスク
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

export default Ex10;
