import TaskItem from "./componentes/taskitem";

function Ex02() {
    const tasks = [
        {id: 1, text: "牛乳を買う"},
        {id: 2, text: "コードを書く"},
        {id: 3, text: "散歩する"}
    ];
    return (
        tasks.map(task => <TaskItem task={task} />)
    );
    // keyは表示に使わないので、taskitemには渡されない
    // 変数を渡す際はJS式なので、鍵かっこで覆う
}

export default Ex02