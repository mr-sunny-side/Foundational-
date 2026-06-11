# タスクのインライン編集機能

## 概要

インライン編集とは、リスト上のテキストをその場で直接書き換えられるUXパターン。
「編集」ボタンを押すと `<span>` が `<input>` に切り替わり、保存で元のテキストが更新される。

```
通常時:  [タスクの文字列] [編集] [削除] [完了]
編集中:  [___入力欄___]  [保存] [キャンセル]
```

---

## 状態設計

編集機能に必要な状態は **2つ**。

| 状態 | 型 | 役割 |
|------|----|------|
| `isEditing` | `boolean` | このタスクが編集中かどうか |
| `editText` | `string` | 編集中の一時的なテキスト |

### どこに置くか？

**タスク行コンポーネントの中（ローカル状態）** に置くのがシンプル。

- ルートの `ex08.jsx` に持ち上げると、全タスク分の「どれが編集中か」を管理しなければならない
- 各タスク行が自分の編集状態を持つほうが責任の分離が明確

---

## 実装方針

現在の `TaskList.jsx` は `filtered_tasks.map(...)` の中で直接 `<li>` を書いている。
ここを **`TaskItem` コンポーネント**（行全体を担当）に切り出すと、ローカル状態を持てるようになる。

> `TaskItem.jsx` には現在ボタン群が入っているが、行全体を表すコンポーネントは別途作るか、
> `TaskItem.jsx` 内に追加するとよい。

---

## ステップごとの実装

### Step 1: TaskItem（行コンポーネント）に編集状態を追加

```jsx
// TaskItem.jsx に追加
import { useState } from "react";

function TaskItem({ task, tasks, set_task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    // ...（以降のハンドラを追加）
}
```

**ポイント:**
- `isEditing` の初期値は `false`（通常表示からスタート）
- `editText` の初期値は `task.text`（現在のテキストを引き継ぐ）

---

### Step 2: 保存ハンドラを実装

```jsx
const handleSave = () => {
    if (editText.trim() === "") return; // 空文字は保存しない
    set_task(tasks.map(t =>
        t.id === task.id
        ? { ...t, text: editText }  // 該当タスクのtextだけ差し替え
        : t
    ));
    setIsEditing(false); // 編集モードを終了
};
```

**ポイント:**
- `tasks.map()` で配列を作り直す（既存の `CompButton` と同じパターン）
- `{ ...t, text: editText }` はスプレッド構文で `text` だけ上書き
- 保存後に `setIsEditing(false)` で表示モードに戻る

---

### Step 3: キャンセルハンドラを実装

```jsx
const handleCancel = () => {
    setEditText(task.text); // 編集前のテキストに戻す
    setIsEditing(false);
};
```

**ポイント:**
- `editText` を元の `task.text` にリセットする
- これをしないと次回「編集」を開いたとき中途半端な文字列が残る

---

### Step 4: 条件付きレンダリング

```jsx
return (
    <li>
        {isEditing ? (
            // 編集モード
            <>
                <input
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleSave}>保存</button>
                <button onClick={handleCancel}>キャンセル</button>
            </>
        ) : (
            // 通常表示モード
            <>
                <span style={{ textDecoration: task.complete ? "line-through" : "none" }}>
                    {task.text}
                </span>
                <button onClick={() => setIsEditing(true)}>編集</button>
                <DeleteButton tasks={tasks} set_task={set_task} id={task.id} />
                <CompButton tasks={tasks} set_task={set_task} id={task.id} />
            </>
        )}
    </li>
);
```

**ポイント:**
- `isEditing ? (...) : (...)` の三項演算子で表示を切り替える
- `<>...</>` は `React.Fragment`。余分な `<div>` を増やさずに複数要素をまとめられる
- 編集中は削除・完了ボタンを隠す（誤操作防止）

---

### Step 5: TaskList を更新して TaskItem を使う

```jsx
// TaskList.jsx
import TaskItem from "./TaskItem"; // ← 行コンポーネントをimport

function TaskList({ filtered_tasks, set_task }) {
    return (
        filtered_tasks.map(task =>
            <TaskItem
                key={task.id}
                task={task}
                tasks={filtered_tasks}
                set_task={set_task}
            />
        )
    );
}
```

---

## 完成コード全体

### TaskItem.jsx（行コンポーネントを追加）

```jsx
import { useState } from "react";

// ---- ボタン群（既存）----

function AddButton({ tasks, set_task, input, set_input }) { /* 省略 */ }
function DeleteButton({ tasks, set_task, id }) { /* 省略 */ }
function CompButton({ tasks, set_task, id }) { /* 省略 */ }
function FilterButton({ filter, set_filter }) { /* 省略 */ }

// ---- 行コンポーネント（新規）----

function TaskItem({ task, tasks, set_task }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const handleSave = () => {
        if (editText.trim() === "") return;
        set_task(tasks.map(t =>
            t.id === task.id ? { ...t, text: editText } : t
        ));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <li>
            {isEditing ? (
                <>
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleSave}>保存</button>
                    <button onClick={handleCancel}>キャンセル</button>
                </>
            ) : (
                <>
                    <span style={{ textDecoration: task.complete ? "line-through" : "none" }}>
                        {task.text}
                    </span>
                    <button onClick={() => setIsEditing(true)}>編集</button>
                    <DeleteButton tasks={tasks} set_task={set_task} id={task.id} />
                    <CompButton tasks={tasks} set_task={set_task} id={task.id} />
                </>
            )}
        </li>
    );
}

export { AddButton, DeleteButton, CompButton, FilterButton, TaskItem };
```

### TaskList.jsx

```jsx
import { TaskItem } from "./TaskItem";

function TaskList({ filtered_tasks, set_task }) {
    return (
        filtered_tasks.map(task =>
            <TaskItem
                key={task.id}
                task={task}
                tasks={filtered_tasks}
                set_task={set_task}
            />
        )
    );
}

export default TaskList;
```

---

## 今回のポイントまとめ

| 概念 | 使った場面 |
|------|-----------|
| ローカル状態 (`useState`) | 各タスク行が自分の `isEditing` / `editText` を持つ |
| 条件付きレンダリング | `isEditing` の値で `<input>` か `<span>` かを切り替える |
| スプレッド構文 (`...`) | `map` でテキストだけ差し替えたオブジェクトを生成 |
| コンポーネント分割 | `TaskList` のmap内を `TaskItem` に切り出し、状態を持てるようにした |

---

## よくある落とし穴

### `editText` を初期化し忘れる
キャンセル時に `setEditText(task.text)` を呼ばないと、次に編集ボタンを押したとき
前回の途中入力が残ってしまう。

### `tasks` の参照に注意
`TaskList` は `filtered_tasks` を `tasks` として渡しているため、削除・更新のロジックは
フィルター済みの配列に対してのみ動作する。
全タスクを操作したい場合は、ルートの `Tasks` を渡す必要がある。
（現在の削除・完了ボタンも同じ制約を持っている）

### Enterキーで保存したい場合
`<input>` に `onKeyDown` を追加するだけで対応できる。

```jsx
<input
    value={editText}
    onChange={(e) => setEditText(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter") handleSave();
        if (e.key === "Escape") handleCancel();
    }}
/>
```
