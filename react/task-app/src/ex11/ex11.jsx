// 05-30
// ex11の記述
// - fastAPIからタスクの初期値(get)を受け取る記述
import { useState } from "react";

import { FilterButton } from "./TaskItem";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Ex11() {
    const [Tasks, setTask] = useState([]);
    const [Input, setInput] = useState("");
    const [Filter, setFilter] = useState("all");

    let FilteredTasks;
    if (Filter === "active") {
        FilteredTasks = Tasks.filter(task => !task.complete)
    }
}
