import React, {MouseEventHandler} from "react";
import Button from '@mui/material/Button';


type VariantType = "contained" | "outlined" | "text"
type SizeType = "small" | "medium" | "large"

type ButtonPropsType = {
    name:string
    onClick ?: () => void
    disabled ?: boolean
    className?: string
    variant?: VariantType
    size?: SizeType
}
export const UniversalButton = ({name, onClick, disabled, className, variant, size}:ButtonPropsType) => {

    return (
        <>
            <Button
                size={size}
                variant={variant}
                onClick={onClick}
                disabled={disabled}
                className={className}
            >{name}</Button>
        </>


    )
}