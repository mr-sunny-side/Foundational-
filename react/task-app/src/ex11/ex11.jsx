// 05-30
// ex10の復習から - ex11.jsx以外の記述は完了
//

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
