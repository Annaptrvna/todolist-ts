import React, {MouseEventHandler} from "react";

type ButtonPropsType = {
    name:string
    onclickHandler ?: () => void
}
export const Button = ({name, onclickHandler}:ButtonPropsType) => {
    return (
        <>
            <button onClick={onclickHandler}>{name}</button>
        </>


    )
}