import React from "react";

type ButtonPropsType = {
    name:string
}
export const Button = ({name}:ButtonPropsType) => {
    return (
        <>
            <button>{name}</button>
        </>


    )
}