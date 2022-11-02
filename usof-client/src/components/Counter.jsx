import React, { useState } from 'react'

const Counter = () => {
    let [count, setCount] = useState(0);
    function increment (){
        setCount(count += 1);
      }
      function decriment (){
        setCount(count -= 1);
      }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={decriment}>-</button>
            <button onClick={increment}>+</button>
        </div>
    )
}

export default Counter;