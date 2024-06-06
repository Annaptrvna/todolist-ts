import React, {MouseEventHandler} from "react";

type ButtonPropsType = {
    name:string
    onclickHandler ?: () => void
    disabled ?: boolean
}
export const Button = ({name, onclickHandler, disabled}:ButtonPropsType) => {

    return (
        <>
            <button
                onClick={onclickHandler}
                disabled={disabled}
            >{name}</button>
        </>


    )
}