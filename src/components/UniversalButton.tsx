import React, {MouseEventHandler} from "react";



type ButtonPropsType = {
    name:string
    onClick ?: () => void
    disabled ?: boolean
    className?: string
}
export const UniversalButton = ({name, onClick, disabled, className}:ButtonPropsType) => {

    return (
        <>
            <button
                onClick={onClick}
                disabled={disabled}
                className={className}
            >{name}</button>
        </>


    )
}