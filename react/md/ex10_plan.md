# ex10 FastAPI実装ガイド

## このガイドの目的

現在のex10タスクアプリはすべてReact（ブラウザ側）だけで動いている。
ページを更新するとデータが消えるし、複数のタブで開いてもデータが共有されない。

これをFastAPIを使ったバックエンドと連携させることで：
- データをSQLiteに永続化する（再起動してもデータが残る）
- 追加・削除・完了切り替えをすべてAPI経由にする
- APIが止まったときにどう動くかを体験する

---

## 全体のアーキテクチャ

```
[ ブラウザ (React) ]
        ↑↓  HTTP通信 (fetch)
[ FastAPI サーバー (Python) ]
        ↑↓  SQL
[ SQLite (tasks.db ファイル) ]
```

### 現在の状態（フロントエンドのみ）
```
ブラウザ → useState → メモリ上のみ（リロードで消える）
```

### 目標の状態（フルスタック）
```
ブラウザ → fetch → FastAPI → SQLite（永続化）
```

---

## ステップ1：FastAPIとは何か

FastAPIはPythonで書けるWebフレームワーク。
「フレームワーク」とは、よく使う機能（HTTPルーティング、バリデーションなど）をまとめたライブラリのこと。

ReactがUIを作るためのフレームワークなら、FastAPIはAPIサーバーを作るためのフレームワーク。

### APIとは
API（Application Programming Interface）とは、プログラム同士が会話するための窓口。

今回の場合：
- Reactが「タスクを追加して」とリクエストを送る
- FastAPIが受け取って処理し「OK、追加したよ」と返す

この通信はHTTPプロトコル（ブラウザがWebサイトにアクセスするときと同じ仕組み）で行う。

---

## ステップ2：プロジェクト構成を決める

```
portfolio/
├── react/
│   └── task-app/         ← Reactアプリ（既存）
│       └── src/ex10/
└── api/
    └── task_api/         ← 今から作るFastAPIサーバー
        ├── main.py       ← APIのメイン処理
        ├── database.py   ← SQLite接続の設定
        ├── models.py     ← データの型定義
        └── tasks.db      ← SQLiteのデータファイル（自動生成）
```

---

## ステップ3：環境構築

### Pythonのインストール確認
```bash
python3 --version
# Python 3.10以上が推奨
```

### 仮想環境の作成
仮想環境とは、プロジェクトごとに独立したPythonの環境。
異なるプロジェクトで異なるバージョンのライブラリを使えるようにする仕組み。

```bash
# apiディレクトリを作成して移動
mkdir -p ~/portfolio/api/task_api
cd ~/portfolio/api/task_api

# 仮想環境を作成（.venvというフォルダが作られる）
python3 -m venv .venv

# 仮想環境を有効化（このコマンドを打った端末の中だけで有効）
source .venv/bin/activate

# 有効化されると先頭に (.venv) が表示される
# (.venv) user@machine:~/portfolio/api/task_api$
```

### 必要なライブラリのインストール
```bash
pip install fastapi uvicorn sqlmodel
```

各ライブラリの役割：
| ライブラリ | 役割 |
|-----------|------|
| `fastapi` | APIサーバーのフレームワーク本体 |
| `uvicorn` | FastAPIを動かすWebサーバー（Reactでいうvite dev serverのようなもの） |
| `sqlmodel` | DBモデルとAPIスキーマを1つのクラスで書けるライブラリ（内部でSQLAlchemyを使っている） |

---

## ステップ4：データベースの設定を書く

`database.py`を作成する。

```python
# database.py
from sqlmodel import create_engine, Session, SQLModel

DATABASE_URL = "sqlite:///./tasks.db"

# エンジン = データベースとの接続を管理するオブジェクト
# connect_args は SQLite をマルチスレッドで使うための設定
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

def create_db():
    """テーブルが存在しない場合に自動作成する"""
    SQLModel.metadata.create_all(engine)

def get_db():
    """DBセッションを取得するための関数（依存性注入で使う）"""
    with Session(engine) as session:
        yield session  # yieldで一時停止 → リクエスト処理 → withブロック終了でクローズ
```

### なぜこういう書き方をするのか
SQLiteは直接ファイルを読み書きするが、その操作を安全に管理するために`engine`と`session`という抽象化された仕組みを使う。
SQLModelでは`with Session(engine) as session`と書くだけで、処理が終わったら自動的にDBとの接続が閉じられる。
SQLAlchemyより記述量が少ない。

---

## ステップ5：モデル（テーブル定義）を書く

`models.py`を作成する。

```python
# models.py
from sqlmodel import SQLModel, Field

# table=True をつけるとDBテーブルとして扱われる
# 同時にAPIのレスポンス型としても使える（一石二鳥）
class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)  # 主キー（自動採番）
    text: str                                                # タスクのテキスト
    complete: bool = False                                   # 完了フラグ

# POSTリクエスト用（idは送らないので別クラスにする）
class TaskCreate(SQLModel):
    text: str

# PATCHリクエスト用（更新したいフィールドだけ送れるよう全部Noneにする）
class TaskUpdate(SQLModel):
    text: str | None = None
    complete: bool | None = None
```

### SQLAlchemyとの比較

SQLAlchemyでは`Column(Integer, ...)`のような専用の書き方が必要だったが、
SQLModelではPythonの型ヒント（`int`, `str`, `bool`）をそのまま使える。

また、SQLAlchemyでは「DBモデル」と「レスポンス用のPydanticモデル」を別々に定義する必要があったが、
SQLModelでは`Task`クラス1つがその両方を兼ねる。

```
SQLAlchemy:  Task(DBモデル) + TaskResponse(Pydanticモデル) = 2クラス
SQLModel:    Task(table=True) = 1クラスで両方OK
```

### SQLiteのテーブルとPythonクラスの対応
このクラスを定義することで、以下のSQLテーブルが作られる。

```sql
CREATE TABLE tasks (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    text     TEXT    NOT NULL,
    complete BOOLEAN DEFAULT FALSE
);
```

---

## ステップ6：APIのメイン処理を書く

`main.py`を作成する。

```python
# main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select

from models import Task, TaskCreate, TaskUpdate
from database import engine, get_db, create_db

# テーブルが存在しない場合に自動作成する
create_db()

# FastAPIアプリのインスタンスを作成
app = FastAPI()

# CORS設定（後述）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Reactの開発サーバーのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- エンドポイント定義 --------
# response_modelにTaskをそのまま使える（SQLAlchemyではTaskResponseが別途必要だった）

@app.get("/tasks", response_model=list[Task])
def get_tasks(db: Session = Depends(get_db)):
    return db.exec(select(Task)).all()


@app.post("/tasks", response_model=Task, status_code=201)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    new_task = Task(text=task.text)
    db.add(new_task)
    db.commit()
    db.refresh(new_task)  # DBが採番したidを取得するためにrefreshする
    return new_task


@app.patch("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.get(Task, task_id)  # db.get(モデル, id) で1件取得
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.text is not None:
        db_task.text = task.text
    if task.complete is not None:
        db_task.complete = task.complete

    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.get(Task, task_id)
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(db_task)
    db.commit()
    return None  # 204 No Content
```

### HTTPメソッドの使い分け
| メソッド | 用途 | 今回の使用箇所 |
|---------|------|--------------|
| `GET` | データを取得 | タスク一覧取得 |
| `POST` | 新しいデータを作成 | タスク追加 |
| `PATCH` | 既存データの一部を更新 | 完了切り替え・テキスト編集 |
| `DELETE` | データを削除 | タスク削除 |

### CORSとは
CORS（Cross-Origin Resource Sharing）とは、異なるオリジン（ドメイン+ポート）間の通信を制御する仕組み。

- Reactの開発サーバー: `http://localhost:5173`
- FastAPIサーバー: `http://localhost:8000`

ポートが違うため「異なるオリジン」として扱われる。
ブラウザは安全のためデフォルトでこのような通信をブロックするので、FastAPI側でReactのオリジンを明示的に許可する必要がある。

---

## ステップ7：FastAPIサーバーを起動する

```bash
# task_apiディレクトリで実行
cd ~/portfolio/api/task_api
source .venv/bin/activate
uvicorn main:app --reload --port 8000
```

`--reload` は開発用オプションで、ファイルを変更すると自動的にサーバーが再起動する（Reactの`vite --watch`と同じ感覚）。

### 起動確認
ブラウザで `http://localhost:8000/docs` を開くと、Swagger UIという自動生成されたAPIドキュメントが表示される。
ここから直接APIを叩いて動作確認ができる。

```
GET    /tasks          → 全タスクを返す
POST   /tasks          → タスクを作成する
PATCH  /tasks/{id}     → タスクを更新する
DELETE /tasks/{id}     → タスクを削除する
```

---

## ステップ8：Reactを改修する

### 改修の方針
現在のコードは`useState`でタスクを管理しているが、これをAPIと同期させる。

```
現在: ボタンクリック → setTask() → stateが更新 → 再レンダリング

目標: ボタンクリック → fetchでAPIを叩く → APIがDBを更新 → 再度fetchで最新状態を取得 → setTask() → 再レンダリング
```

### ex10.jsx の改修

```jsx
// ex10.jsx
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { FilterButton } from "./TaskItem";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:8000";

function Ex09() {
    const [Input, setInput] = useState("");
    const [Tasks, setTask] = useState([]);
    const [Filter, setFilter] = useState("all");
    const [Error, setError] = useState(null);  // エラー状態を追加

    // コンポーネントのマウント時にタスクを取得
    useEffect(() => {
        fetchTasks();
    }, []);

    // APIからタスク一覧を取得
    const fetchTasks = async () => {
        try {
            const res = await fetch(`${API_URL}/tasks`);
            if (!res.ok) throw new Error("サーバーエラー");
            const data = await res.json();
            setTask(data);
            setError(null);
        } catch (e) {
            setError("APIに接続できません。サーバーが起動しているか確認してください。");
        }
    };

    let FilteredTasks;
    if (Filter === "active") {
        FilteredTasks = Tasks.filter(task => !task.complete);
    } else if (Filter === "complete") {
        FilteredTasks = Tasks.filter(task => task.complete);
    } else {
        FilteredTasks = Tasks;
    }

    return (
        <div>
            {Error && <p style={{color: "red"}}>{Error}</p>}
            <TaskForm
                fetchTasks={fetchTasks}
                input={Input}
                set_input={setInput}
                apiUrl={API_URL}
            />
            <FilterButton filter={Filter} set_filter={setFilter} />
            <TaskList
                filtered_tasks={FilteredTasks}
                fetchTasks={fetchTasks}
                apiUrl={API_URL}
            />
        </div>
    );
}

export default Ex09;
```

### TaskItem.jsx の改修（AddButton・DeleteButton・CompButton）

```jsx
// TaskItem.jsx の改修版
import { useState } from "react";

function AddButton({ fetchTasks, input, set_input, apiUrl }) {
    const handleAdd = async () => {
        if (input.trim() === "") return;
        try {
            const res = await fetch(`${apiUrl}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: input }),
            });
            if (!res.ok) throw new Error();
            set_input("");
            fetchTasks();  // 追加後に一覧を再取得
        } catch {
            alert("タスクの追加に失敗しました");
        }
    };
    return <button onClick={handleAdd}>追加</button>;
}

function DeleteButton({ id, fetchTasks, apiUrl }) {
    const handleDelete = async () => {
        try {
            const res = await fetch(`${apiUrl}/tasks/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            fetchTasks();  // 削除後に一覧を再取得
        } catch {
            alert("タスクの削除に失敗しました");
        }
    };
    return <button onClick={handleDelete}>削除</button>;
}

function CompButton({ id, complete, fetchTasks, apiUrl }) {
    const handleComp = async () => {
        try {
            const res = await fetch(`${apiUrl}/tasks/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ complete: !complete }),
            });
            if (!res.ok) throw new Error();
            fetchTasks();  // 更新後に一覧を再取得
        } catch {
            alert("更新に失敗しました");
        }
    };
    return <button onClick={handleComp}>完了</button>;
}

function FilterButton({ filter, set_filter }) {
    return (
        <>
            <button onClick={() => set_filter("all")}>全て</button>
            <button onClick={() => set_filter("active")}>未完了</button>
            <button onClick={() => set_filter("complete")}>完了</button>
        </>
    );
}

function TaskItem({ task, fetchTasks, apiUrl }) {
    const [IsEditing, setIsEditing] = useState(false);
    const [EditText, setEditText] = useState(task.text);

    const handleSave = async () => {
        if (EditText.trim() === "") return;
        try {
            const res = await fetch(`${apiUrl}/tasks/${task.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: EditText }),
            });
            if (!res.ok) throw new Error();
            setIsEditing(false);
            fetchTasks();
        } catch {
            alert("編集に失敗しました");
        }
    };

    const handleCancel = () => {
        setEditText(task.text);
        setIsEditing(false);
    };

    return (
        <li key={task.id}>
            {IsEditing ? (
                <>
                    <input
                        type="text"
                        value={EditText}
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
                    <DeleteButton id={task.id} fetchTasks={fetchTasks} apiUrl={apiUrl} />
                    <CompButton id={task.id} complete={task.complete} fetchTasks={fetchTasks} apiUrl={apiUrl} />
                </>
            )}
        </li>
    );
}

export { AddButton, DeleteButton, CompButton, FilterButton, TaskItem };
```

### TaskForm.jsx の改修

```jsx
// TaskForm.jsx の改修版
import { AddButton } from "./TaskItem";

function TaskForm({ fetchTasks, input, set_input, apiUrl }) {
    return (
        <div>
            <input
                type="text"
                value={input}
                onChange={(e) => set_input(e.target.value)}
            />
            <button onClick={() => set_input("")}>クリア</button>
            <AddButton
                fetchTasks={fetchTasks}
                input={input}
                set_input={set_input}
                apiUrl={apiUrl}
            />
        </div>
    );
}

export default TaskForm;
```

### TaskList.jsx の改修

```jsx
// TaskList.jsx の改修版
import { TaskItem } from "./TaskItem";

function TaskList({ filtered_tasks, fetchTasks, apiUrl }) {
    return filtered_tasks.map(task =>
        <TaskItem
            key={task.id}
            task={task}
            fetchTasks={fetchTasks}
            apiUrl={apiUrl}
        />
    );
}

export default TaskList;
```

---

## ステップ9：変更のポイントまとめ

### propsの変わり方

| 改修前のprops | 改修後のprops | 理由 |
|-------------|-------------|------|
| `tasks`, `set_task` | `fetchTasks` | stateを直接渡す代わりに、「再取得する関数」を渡すだけにした |
| `id` のみ | `id`, `complete`, `apiUrl` | APIに必要な情報を追加 |

### `fetchTasks`の役割
API改修後の「操作の流れ」はすべて同じパターンになる：

```
1. fetchで操作リクエストをAPIに送る
2. 成功したら fetchTasks() を呼んで最新データを再取得
3. setTask() でstateを更新
4. 再レンダリング
```

この「操作したら再取得」というパターンが重要。
state管理をフロントエンドで持つのではなく、DBを「真実の源（Single Source of Truth）」にする考え方。

---

## ステップ10：エラーハンドリングを確認する

### エラーが起きる主なケース
1. FastAPIサーバーが起動していない
2. サーバーが処理中にクラッシュした
3. 存在しないタスクIDに操作しようとした（404）

### エラーをシミュレートする方法

**ケース1: サーバーを止めてみる**
```bash
# FastAPIを起動したターミナルで Ctrl+C を押して停止
# その後ReactからタスクをAddしようとするとアラートが出る
```

**ケース2: ブラウザの開発者ツールで確認する**
1. F12を押して開発者ツールを開く
2. 「Network」タブを選択
3. タスクを追加・削除・完了を操作する
4. HTTPリクエストとレスポンスが一覧で確認できる

**ケース3: `http://localhost:8000/docs` でAPIを直接叩く**
- 存在しないid（例: 9999）に対してDELETEを叩くと404が返ることを確認できる

### try/catchの仕組み

```javascript
try {
    // ここでエラーが起きたら...
    const res = await fetch(`${API_URL}/tasks`);
    if (!res.ok) throw new Error("HTTP error");  // ← 明示的にエラーを投げる
    const data = await res.json();
    setTask(data);
} catch (e) {
    // ...ここに飛んでくる
    setError("接続できません");
}
```

`fetch`自体はネットワーク完全断のときしかエラーを投げない。
4xx/5xxのHTTPエラーは`res.ok`で判定して自分で`throw`する必要がある。

---

## チェックリスト

### バックエンド
- [ ] 仮想環境を作成・有効化した
- [ ] `fastapi`, `uvicorn`, `sqlmodel` をインストールした
- [ ] `database.py`, `models.py`, `main.py` を作成した
- [ ] `uvicorn main:app --reload` でサーバーが起動した
- [ ] `http://localhost:8000/docs` でSwagger UIが表示された
- [ ] Swagger UIからGET /tasks が `[]` を返すことを確認した

### フロントエンド
- [ ] `ex10.jsx` を改修してuseEffectでfetchTasksを呼んでいる
- [ ] タスクの追加がAPIを経由して動く
- [ ] タスクの削除がAPIを経由して動く
- [ ] 完了切り替えがAPIを経由して動く

### 動作確認
- [ ] Reactを開いたままFastAPIを再起動してもタスクが消えない
- [ ] FastAPIを止めた状態で操作するとエラーメッセージが出る
- [ ] Networkタブでリクエストとレスポンスを確認した

---

## よくあるエラーと対処法

### `cors error` / `blocked by CORS policy`
**原因**: CORSの設定が間違っている  
**対処**: `main.py`の`allow_origins`にReactの正確なURLが入っているか確認  
```python
allow_origins=["http://localhost:5173"]  # ポート番号に注意
```

### `ModuleNotFoundError: No module named 'fastapi'`
**原因**: 仮想環境が有効化されていない  
**対処**: `source .venv/bin/activate` を実行してから `uvicorn` を起動する

### `sqlalchemy.exc.OperationalError`
**原因**: `tasks.db` が壊れているか、モデルのフィールドを変更した  
**対処**: `tasks.db` を削除してサーバーを再起動（テーブルが自動再作成される）  
※SQLModelは内部でSQLAlchemyを使っているためエラークラス名はそのまま

### タスクを追加してもReactに表示されない
**原因**: `fetchTasks()`を呼び忘れている  
**対処**: POST/PATCH/DELETE後に必ず`fetchTasks()`を呼んでいるか確認する
