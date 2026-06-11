
// 追加ボタンのロジック
function AddButton({tasks, set_task, input, set_input}) {
    const handleAdd = () => {
        if (input.trim() === "") return;
        const new_task = {id: Date.now(), text: input, complete: false};
        set_task([...tasks, new_task]);
        set_input("");
    };

    return <button onClick={handleAdd}>追加</button>;
}

// 削除ボタンのロジック
function DeleteButton({tasks, set_task, id}) {
    const handleDelete = () => {
        set_task(tasks.filter(task =>
            task.id !== id
        ));
    };

    return <button onClick={handleDelete}>削除</button>;
}

// 完了ボタンのロジック
function CompButton({tasks, set_task, id}) {
    const handleComp = () => {
        set_task(tasks.map(task =>
            task.id === id
            ? {...task, complete: !task.complete}
            : task
        ));
    };

    return <button onClick={handleComp}>完了</button>;
}

function FilterButton({filter, set_filter}) {
    return (
        <div>
            <button onClick={() => set_filter("all")}>全て</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("complete")}>完了</button>
        </div>
    )
}

export {AddButton, DeleteButton, CompButton, FilterButton};
