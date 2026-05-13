import { useState } from "react";

function Ex03c() {
    // 配列に対するusestate関数
    const [tasks, setTasks] = useState([])
    const [Input, setInput] = useState("")
    // 配列に追加する際の型
    const newTask = {id: Date.now(), text: Input}

    return(
        <div>
            <input
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <button onClick={() => setTasks([...tasks, newTask])}>追加</button>
            <ul>
                {/*JSXの中でスクリプトを書くときは、波かっこで囲う*/}
                {tasks.map((task) => (
                    <li key={task.id}>{task.text}</li>
                ))}
            </ul>
        </div>
    )
}

export default Ex03c