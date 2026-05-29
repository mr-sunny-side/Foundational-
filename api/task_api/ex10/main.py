from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware( # ミドルウェア(reqとresの間の処理)を追加
    CORSMiddleware,  # CORSのミドルウェアを追加
    allow_origins=["http://localhost:5173"],    # リクエストを許可するオリジン
    allow_methods=["*"],                        # 全てのメソッドを許可
    allow_headers=["*"],                        # 全てのヘッダーを許可
)

tasks = [
    {"id": 1, "text": "牛乳を買う", "complete": False},
    {"id": 2, "text": "コードを書く", "complete": False}
]

@app.get("/tasks")
def get_tasks():
    return tasks
