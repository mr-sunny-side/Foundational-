import { useState } from "react";

function Ex03c() {
    // 配列に対するusestate関数
    const [tasks, setTasks] = useState([])
    const [Input, setInput] = useState("")

    return(
        <div>
            <input
                type="text"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={() => setInput("")}>クリア</button>
            <button onClick={() => setTasks([...tasks, Input])}>追加</button>
            <ul>
                
            </ul>
        </div>
    )
}