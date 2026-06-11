# 編集機能のバグ修正

## 概要

編集機能を実装したが動作しなかった。原因は `TaskList.jsx` の2つのバグ。

---

## バグ1: Propsの分割代入漏れ（致命的）

**ファイル:** `TaskList.jsx:5`

```jsx
// バグあり
function TaskList(filtered_tasks, set_task) {

// 修正後
function TaskList({filtered_tasks, tasks, set_task}) {
```

### なぜ動かないのか

Reactコンポーネントへの引数はひとつのpropsオブジェクト。`{}`なしで受け取ると：

| 変数 | 実際の値 |
|------|---------|
| `filtered_tasks` | `{ filtered_tasks: [...], set_task: fn }` （propsオブジェクト全体）|
| `set_task` | `undefined` （Reactが第2引数に渡す`ref`） |

`filtered_tasks.map(...)` でオブジェクトに `.map` を呼ぼうとするためエラーになる。

### 正しい書き方

```jsx
// NG: 引数として2つ並べる（通常の関数の書き方）
function TaskList(filtered_tasks, set_task) { ... }

// OK: {}でpropsオブジェクトを分割代入する
function TaskList({ filtered_tasks, set_task }) { ... }
```

---

## バグ2: 編集時にフィルタ済みタスクだけを保存してしまう

**ファイル:** `TaskList.jsx:10`、`ex08.jsx:29`

```jsx
// TaskList.jsx（バグあり）
<TaskItem
    task={task}
    tasks={filtered_tasks}  // ← フィルタ済みリストを渡している
    set_task={set_task}
/>
```

### なぜ問題なのか

`TaskItem` の `handleSave` は `tasks.map(...)` で全タスクを更新する。

```jsx
const handleSave = () => {
    set_task(tasks.map(t =>
        t.id === task.id ? {...t, text: editText} : t
    ));
};
```

ここで `tasks` がフィルタ済みリスト（例: 未完了のみ）だと、
**`set_task` に渡す配列が完了済みタスクを含まない** → 完了済みタスクが消える。

### 修正方針

`TaskItem` には **全タスクの配列** を渡す必要がある。
そのために `ex08.jsx` から `TaskList` 経由で `Tasks`（全件）を流す。

---

## 修正手順

### Step 1: `ex08.jsx` — TaskList に全タスクを追加で渡す

```jsx
// 修正前
<TaskList filtered_tasks={filteredTasks} set_task={setTask}/>

// 修正後
<TaskList filtered_tasks={filteredTasks} tasks={Tasks} set_task={setTask}/>
```

### Step 2: `TaskList.jsx` — `tasks` を受け取り、TaskItem に渡す

```jsx
// 修正前
function TaskList(filtered_tasks, set_task) {
    return (
        filtered_tasks.map(task =>
            <TaskItem
                task={task}
                tasks={filtered_tasks}
                set_task={set_task}
            />
        ));
}

// 修正後
function TaskList({filtered_tasks, tasks, set_task}) {
    return (
        filtered_tasks.map(task =>
            <TaskItem
                key={task.id}
                task={task}
                tasks={tasks}
                set_task={set_task}
            />
        ));
}
```

---

## 修正後のファイル全体

### `ex08.jsx`（変更箇所のみ）

```jsx
<TaskList filtered_tasks={filteredTasks} tasks={Tasks} set_task={setTask}/>
```

### `TaskList.jsx`

```jsx
import { TaskItem } from "./TaskItem";

function TaskList({filtered_tasks, tasks, set_task}) {
    return (
        filtered_tasks.map(task =>
            <TaskItem
                key={task.id}
                task={task}
                tasks={tasks}
                set_task={set_task}
            />
        ));
}

export default TaskList;
```

---

## 動作確認手順

1. タスクをいくつか追加する
2. 一部のタスクを「完了」にする
3. フィルタを「未完了」に切り替える
4. 表示中のタスクを編集して「保存」
5. フィルタを「全て」に戻し、完了済みタスクが消えていないことを確認

---

## ポイントまとめ

| バグ | 原因 | 修正 |
|------|------|------|
| コンポーネントが動かない | props分割代入の`{}`漏れ | `function TaskList({...})` に修正 |
| フィルタ中に編集すると他のタスクが消える | フィルタ済みリストで`set_task`を呼んでいた | 全タスクの`tasks`を別途渡す |

---

## よくある関連ミス

### `key` を付け忘れる

リストレンダリングでは `key` が必須。`map` の直接の子要素に付ける。

```jsx
// NG
<TaskItem task={task} ... />

// OK
<TaskItem key={task.id} task={task} ... />
```

### `DeleteButton` や `CompButton` も同じ問題を持つ

現在これらのボタンも `tasks={filtered_tasks}` で動いているため、
フィルタ中に削除・完了操作をすると他のタスクが消える。
同様に `tasks={tasks}`（全件）に修正するとよい。
