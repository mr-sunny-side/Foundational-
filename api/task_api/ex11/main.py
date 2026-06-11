from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class TaskCreate(BaseModel):
    text: str

# ミドルウェアを定義
# CORS: 開いているサイト以外への意図しない接続を制限
app.add_middleware(
    CORSMiddleware,     #CORSミドルウェアを定義
    allow_origins=["http://localhost:5173"],    #reactサーバーの接続を許可
    allow_methods=["*"],    # 全てのメソッドを許可
    allow_headers=["*"]     # 全てのヘッダーを許可
)

tasks = [
    {"id": 1, "text": "牛乳を買う", "complete": False},
    {"id": 2, "text": "コードを書く", "complete": False}
]

@app.get("/tasks/get")
def get_task():
    return tasks

@app.post("/tasks/post", status_code=201)
def post_task(task: TaskCreate):

    # インメモリのため、IDは仮実装
    new_task = {
        "id": len(task) + 1,
        "text": task.text,
        "complete": False
    }
    task.append(new_task)
    return new_task
