// 追加・削除・完了・フィルターボタンの作成

//formの追加ボタンのロジック
function AddButton({tasks, set_task, input, set_input}) {
    if (input.trim() === "") return;
    const new_task = {id: Date.now(), text: input, complete: false}
    set_task([...tasks, new_task])
    set_input("")
}
