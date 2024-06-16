import React, {MouseEventHandler} from "react";

type ButtonPropsType = {
    name:string
    onclickHandler ?: () => void
    disabled ?: boolean
    className?: string
}
export const Button = ({name, onclickHandler, disabled, className}:ButtonPropsType) => {

    return (
        <>
            <button
                onClick={onclickHandler}
                disabled={disabled}
                className={className}
            >{name}</button>
        </>


    )
}