import { Alert, Collapse } from "@mui/material";
import { useEffect, useState } from "react";

export function ErrorAlertC(props : {text : string, tipo: "success" | "error"}) {
    const {text, tipo} = props;
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
        <Collapse style={{marginTop: 5}} in={open} ><Alert severity={tipo} onClose={() => {setOpen(false)}}>{text}
        </Alert></Collapse>
    )
}

//10-11 12:57 Se alguem perguntar, Sim eu poderia unificar os dois e economizar algumas linhas 