from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date

app = FastAPI()

app.add_middleware(         # ミドルウェアを追加
    CORSMiddleware,         # CORSのミドルウェアを設定
    allow_origins=["http://localhost:5173"],  # 接続を許可するオリジンを設定
    allow_methods=["*"],    # メソッドを全て許可
    allow_headers=["*"],    # ヘッダーを全て許可
)

tasks = []

class TaskCreate(BaseModel):
    text: str

# タスク追加のロジック、リアクトの追記から
# インメモリなので仮実装
@app.post("/tasks", status_code=201)
def crate_task(task: TaskCreate):
    new_task = {
        "id": len(tasks) + 1,    # リストのサイズで仮にIDを付与
        "text": task.text,
        "complete": False
    }
    tasks.append(new_task)
    return new_task
