import React from "react";
import useCounter from "../Hooks/useCounter"

const UserData = (props) =>{
    const { counter,increment,decrement} = useCounter()
return (
    
    <div>
        <button type="button" name="decrement" onClick={decrement}>-</button>
        <p>Count:{counter}</p>
        <button type="button" name="increment" onClick={increment}> +</button>
    </div>
)
}

export default UserData