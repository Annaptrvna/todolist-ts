import {SxProps} from "@mui/material";

export const filterButtonContainerSx: SxProps = {
    display: "flex",
    justifyContent: "space-between"
}

export const getListItemsSx = (isDone: boolean): SxProps => (
    {opacity: isDone ? 0.5 : 1,
        display:"flex",
        p: "0"
    })
