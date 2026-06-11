"""
    05-27:
    - 新しく作ったex09から開始

    - 仮想環境と依存関係のインストール  完了


"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# CORSは指定外のオリジンからのアクセスを制限する

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], # reactサーバーからのアクセスを許可
    allow_methods=["*"], # 全てのメソッドを許可
    allow_headers=["*"] # 全てのヘッダーを許可
)

tasks = [
    {"id": 1, "text": "牛乳を買う", "complete": False},
    {"id": 2, "text": "コードを書く", "complete": False}
]

# reactサーバーにタスクを送る
@app.get("/tasks")
def get_tasks():
    return tasks
