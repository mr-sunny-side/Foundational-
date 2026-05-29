from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(         # ミドルウェアを追加
    CORSMiddleware,         # CORSのミドルウェアを設定
    allow_originals=["http://localhost:5173"],  # 接続を許可するオリジンを設定
    allow_methods=["*"],    # メソッドを全て許可
    allow_headers=["*"],    # ヘッダーを全て許可
)

# タスク追加のロジック作成から
