// 追加・削除・完了・フィルターボタンの作成

//formの追加ボタンのロジック
function AddButton({tasks, set_task, input, set_input}) {
    const handleAdd = () => {
        if (input.trim() === "") return;
        const new_task = {id: Date.now(), text: input, complete: false};
        set_task([...tasks, new_task]);
        set_input("");
    }

    return <button onClick={handleAdd}>追加</button>;
}

// 削除ボタンのロジック
// 削除対象以外のタスクで、配列を組み直す
function DeleteButton({tasks, set_task, id}) {
    const handleDelete = () => {
        set_task(tasks.filter(
            task => task.id !== id
        ));
    };

    return <button onClick={handleDelete}>削除</button>;
}

// 完了ボタンのロジック
// 対象のcompleteを反転させる
function CompButton({tasks, set_task, id}) {
    const handleComp = () => {
        set_task(tasks.map(task =>
            task.id === id
            ? {...task, complete: !task.complete}
            : task
        ));
    };

    return <button onClick={handleComp}>完了</button>
}

// フィルターボタンのロジック
// それぞれのボタンでフィルター状態を変更する
function FilterButton({filter, set_filter}) {
    return (
        <>
            <button onClick={() => set_filter("all")}>全て</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("complete")}>完了</button>
        </>
    )
}

export {AddButton, DeleteButton, CompButton, FilterButton}
