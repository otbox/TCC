import { Alert, Collapse } from "@mui/material";
import { useEffect, useState } from "react";

export function SuccessAlert() {
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const timeId = setTimeout(() => {
          // After 3 seconds set the show value to false
          setOpen(false)
        }, 3000)
    
        return () => {
            clearTimeout(timeId)
        }
    }, []);

    return(
        <Collapse in={open} ><Alert severity="success" onClose={() => {setOpen(false)}}>This is a success alert — check it out!</Alert></Collapse>
    )
}

