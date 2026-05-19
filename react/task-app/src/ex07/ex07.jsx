// 05-19
// ex07_filter.mdを読んでフィルタの追加から

import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function Ex07() {
    const [Tasks, setTask] = useState([]);
    const [Input, setInput] = useState("");

    return (
        <div>
            <TaskForm tasks={Tasks} set_task={setTask} input={Input} set_input={setInput}/>
            <TaskList tasks={Tasks} set_task={setTask} />
        </div>
    )
}

export default Ex07
