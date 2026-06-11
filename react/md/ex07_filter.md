# ex07 フィルター機能の追加

## 目標

「すべて / 未完了 / 完了」の3つのボタンで、表示するタスクを切り替える機能を追加する。

---

## 考え方：state で「現在のフィルター」を管理する

フィルターは「今どれが選ばれているか」という状態なので、`useState` で管理する。

```
filter = "all" | "active" | "completed"
```

選択中のフィルターに応じて、`tasks` 配列を絞り込んでから `TaskList` に渡す。

```
tasks（全件） → filter で絞り込み → filteredTasks → TaskList に渡す
```

---

## 追加プラン

### Step 1: `ex07.jsx` に filter state を追加する

`Ex07` コンポーネントに `filter` という state を追加する。

```jsx
const [filter, setFilter] = useState("all");
```

初期値は `"all"`（すべて表示）。

---

### Step 2: `ex07.jsx` で filteredTasks を計算する

state から render するたびに、フィルターに応じた配列を作る。  
`useState` ではなく、普通の変数でよい（state が変わるたびに再計算される）。

```jsx
let filteredTasks;
if (filter === "active") {
    filteredTasks = Tasks.filter(task => !task.complete);
} else if (filter === "completed") {
    filteredTasks = Tasks.filter(task => task.complete);
} else {
    filteredTasks = Tasks;
}
```

ポイント：`Tasks`（全件）は変えない。表示用に絞り込んだだけの `filteredTasks` を作る。

---

### Step 3: `TaskList` に `filteredTasks` を渡す

今は `tasks={Tasks}` と渡しているところを変える。

```jsx
// 変更前
<TaskList tasks={Tasks} set_task={setTask} />

// 変更後
<TaskList tasks={filteredTasks} set_task={setTask} />
```

`set_task` には引き続き `Tasks`（全件）を操作する関数を渡す点に注意。  
削除・完了の操作は全件に対して行う必要があるため。

---

### Step 4: フィルターボタンを追加する

`FilterButtons` コンポーネントを新しいファイル `FilterButtons.jsx` として作る。

```jsx
function FilterButtons({ filter, set_filter }) {
    return (
        <div>
            <button onClick={() => set_filter("all")}>すべて</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("completed")}>完了</button>
        </div>
    );
}

export default FilterButtons;
```

---

### Step 5: `ex07.jsx` に `FilterButtons` を組み込む

```jsx
import FilterButtons from "./FilterButtons";

// JSX 内
<FilterButtons filter={filter} set_filter={setFilter} />
```

---

## 完成後の ex07.jsx のイメージ

```jsx
import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterButtons from "./FilterButtons";

function Ex07() {
    const [Tasks, setTask] = useState([]);
    const [Input, setInput] = useState("");
    const [filter, setFilter] = useState("all");

    let filteredTasks;
    if (filter === "active") {
        filteredTasks = Tasks.filter(task => !task.complete);
    } else if (filter === "completed") {
        filteredTasks = Tasks.filter(task => task.complete);
    } else {
        filteredTasks = Tasks;
    }

    return (
        <div>
            <TaskForm tasks={Tasks} set_task={setTask} input={Input} set_input={setInput} />
            <FilterButtons filter={filter} set_filter={setFilter} />
            <TaskList tasks={filteredTasks} set_task={setTask} />
        </div>
    );
}

export default Ex07;
```

---

## よくある間違い

| 間違い | 理由 |
|---|---|
| `filteredTasks` を `useState` にしてしまう | 派生データはstateにしない。`Tasks` と `filter` から毎回計算できるため |
| `TaskList` に `tasks={Tasks}` のまま渡す | フィルタリングが反映されない |
| `set_task` に `filteredTasks` を操作する関数を渡す | 削除・完了操作は全件(`Tasks`)に対して行わないとデータが消える |

---

## 発展: 選択中ボタンを強調する

現在どのフィルターが選ばれているか、ボタンの見た目で示すと UX が上がる。  
`filter` props と照合して `style` や `className` を切り替えてみよう。

```jsx
<button
    onClick={() => set_filter("all")}
    style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
>
    すべて
</button>
```
