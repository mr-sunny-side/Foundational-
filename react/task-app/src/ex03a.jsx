// 05-13:
// App.jsxの書き換え　完了

import { useState } from "react";

function Ex03a() {
    const [count, setCount] = useState(0)
    // [現在の値、更新用の関数] = useState(初期値)
    // useStateは配列を返す

    // pは現在の値を表示
    // ボタンで現在の値+1
    // onClick関数は、引数ありで関数を渡すときはアロー関数にして渡す
    // アロー関数でクリックの際、値を更新するよう指定
    return (
        <div>
            <p>{count}</p>  
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    )
}

export default Ex03a