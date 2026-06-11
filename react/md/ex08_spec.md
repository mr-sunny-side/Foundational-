# ex08 仕様書: タスク管理アプリ（編集機能付き）

## 完成イメージ

```
[ 入力欄 ] [クリア] [追加]

[全て] [未完了] [完了済み]

• タスクA         [編集] [完了] [削除]
• ~~タスクB~~     [編集] [完了] [削除]
• [ タスクC編集中 ] [保存] [キャンセル]
```

---

## 機能一覧

| 機能 | 説明 |
|------|------|
| タスク追加 | 入力欄にテキストを入力して「追加」ボタンで追加 |
| 入力クリア | 「クリア」ボタンで入力欄を空にする |
| タスク削除 | 「削除」ボタンでそのタスクをリストから取り除く |
| 完了トグル | 「完了」ボタンで完了状態を切り替える（完了済みは打ち消し線） |
| フィルター | 「全て / 未完了 / 完了済み」でリストを絞り込む |
| インライン編集 | 「編集」ボタンで入力欄に切り替え、保存・キャンセルができる |

---

## ファイル構成

```
ex08/
├── ex08.jsx       # ルートコンポーネント・状態管理
├── TaskForm.jsx   # 入力フォーム
├── TaskItem.jsx   # ボタン群 + タスク行コンポーネント
└── TaskList.jsx   # タスクリストの表示
```

---

## データ設計

### タスクオブジェクトの形

```js
{
    id: number,       // Date.now() で生成
    text: string,     // タスクの内容
    complete: boolean // 完了状態
}
```

### ルートの状態（ex08.jsx）

| 状態変数 | 型 | 初期値 | 役割 |
|----------|----|--------|------|
| `Tasks` | `array` | `[]` | タスクの一覧（全件） |
| `Input` | `string` | `""` | 入力欄の文字列 |
| `Filter` | `string` | `"all"` | 選択中のフィルター |

### TaskItem のローカル状態

| 状態変数 | 型 | 初期値 | 役割 |
|----------|----|--------|------|
| `isEditing` | `boolean` | `false` | 編集モードかどうか |
| `editText` | `string` | `task.text` | 編集中の一時テキスト |

---

## コンポーネント詳細

### `ex08.jsx`

**責任:** 状態管理・フィルタリング計算・レイアウト

- `Tasks`, `Input`, `Filter` の3つの状態を持つ
- `Filter` の値に応じて `filteredTasks` を計算する（`useState` ではなく通常の変数）
- `TaskForm`, `FilterButton`, `TaskList` を並べて表示する

**フィルタリングロジック:**

| Filter の値 | filteredTasks の内容 |
|-------------|---------------------|
| `"all"` | Tasks そのまま |
| `"active"` | `complete === false` のもの |
| `"complete"` | `complete === true` のもの |

**TaskList に渡すべき props:**

| prop | 渡す値 | 理由 |
|------|--------|------|
| `filtered_tasks` | `filteredTasks` | 表示用の絞り込み済みリスト |
| `tasks` | `Tasks` | 編集・削除・完了操作は全件に対して行う必要がある |
| `set_task` | `setTask` | タスク配列を更新する関数 |

---

### `TaskForm.jsx`

**責任:** テキスト入力・クリア・追加ボタンの表示

受け取る props: `tasks`, `set_task`, `input`, `set_input`

- `<input>` の `value` と `onChange` を `input` / `set_input` に接続する
- 「クリア」ボタンは `set_input("")` を呼ぶ
- 「追加」ボタンは `AddButton` コンポーネントに切り出す

---

### `TaskItem.jsx`（ボタン群 + 行コンポーネント）

このファイルには複数のコンポーネントが入る。

#### `AddButton`

受け取る props: `tasks`, `set_task`, `input`, `set_input`

- `input` が空なら何もしない
- 新しいタスクオブジェクトを作り、`[...tasks, new_task]` で配列を更新
- 追加後に `set_input("")` で入力欄をリセット

#### `DeleteButton`

受け取る props: `tasks`, `set_task`, `id`

- `tasks.filter(task => task.id !== id)` で該当タスクを除いた配列を `set_task` に渡す

#### `CompButton`

受け取る props: `tasks`, `set_task`, `id`

- `tasks.map(...)` で該当タスクの `complete` を `!task.complete` に反転させた配列を `set_task` に渡す

#### `FilterButton`

受け取る props: `filter`, `set_filter`

- 3つのボタンを並べる: `"all"` / `"active"` / `"complete"`

#### `TaskItem`（行コンポーネント）

受け取る props: `task`, `tasks`, `set_task`

- `isEditing` と `editText` のローカル状態を持つ
- `isEditing` が `false` の場合: テキスト表示 + 編集・完了・削除ボタン
- `isEditing` が `true` の場合: 入力欄 + 保存・キャンセルボタン

**保存ハンドラ:**
- `editText` が空なら何もしない
- `tasks.map(...)` で該当タスクの `text` を `editText` に置き換えた配列を `set_task` に渡す
- `setIsEditing(false)` で通常表示に戻す

**キャンセルハンドラ:**
- `setEditText(task.text)` で編集前のテキストに戻す
- `setIsEditing(false)` で通常表示に戻す

**エクスポート:**

```js
export { AddButton, DeleteButton, CompButton, FilterButton, TaskItem }
```

---

### `TaskList.jsx`

**責任:** フィルタ済みタスクを `TaskItem` で一覧表示する

受け取る props: `filtered_tasks`, `tasks`, `set_task`

- `filtered_tasks.map(task => <TaskItem ... />)` でリストを生成する
- `TaskItem` には `key={task.id}`, `task={task}`, `tasks={tasks}`, `set_task={set_task}` を渡す
- **注意:** `TaskItem` に渡す `tasks` は `filtered_tasks` ではなく `tasks`（全件）

---

## props の流れ図

```
ex08.jsx
│
├── TaskForm
│   └── props: tasks, set_task, input, set_input
│       └── AddButton: tasks, set_task, input, set_input
│
├── FilterButton
│   └── props: filter, set_filter
│
└── TaskList
    └── props: filtered_tasks, tasks, set_task
        └── TaskItem（各行）
            └── props: key, task, tasks, set_task
                ├── CompButton: tasks, set_task, id
                └── DeleteButton: tasks, set_task, id
```

---

## 実装のポイント

### 条件付きレンダリング（TaskItem）

`isEditing` の値によって表示内容を切り替える。

```
isEditing が true  → 入力欄 + 保存・キャンセルボタン
isEditing が false → テキスト + 編集・完了・削除ボタン
```

### 完了済みタスクの打ち消し線

```
style={{ textDecoration: task.complete ? "line-through" : "none" }}
```

### タスク配列の不変更新パターン

Reactではstateを直接変更しないこと。毎回新しい配列を作って `set_task` に渡す。

| 操作 | 使うメソッド |
|------|------------|
| 追加 | `[...tasks, new_task]` |
| 削除 | `tasks.filter(...)` |
| 更新（完了・編集） | `tasks.map(...)` |

---

## よくある落とし穴

| 間違い | 正しい対応 |
|--------|-----------|
| `function TaskList(filtered_tasks, set_task)` | `{}`で分割代入する |
| `TaskItem` に `tasks={filtered_tasks}` を渡す | 全件の `tasks` を渡す |
| `editText` のリセットを忘れる | キャンセル時に `setEditText(task.text)` を呼ぶ |
| 追加時に `[...tasks, new_task]` の`[]`を忘れる | スプレッドは配列の中に書く |
| フィルタリングに `.map()` を使う | 絞り込みには `.filter()` を使う |
