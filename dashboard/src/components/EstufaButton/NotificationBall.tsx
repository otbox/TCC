import { useState, useEffect } from 'react';


export type NotificationBallProps = {
    Status : "Ideal" | "Ajustando" | "Desligado" | "Manutenção" | string
} 

export default function NotificationBall({Status} : NotificationBallProps) {
    const [color, setColor] = useState<string>()
    useEffect(() => {
        if (Status === "Ideal")
          setColor('rgba(0, 128, 0, 1)');
        else if (Status === "Ajustando")
          setColor('rgba(255, 173, 45, 1)');
        else if (Status === "Desligado")
          setColor('rgba(255, 0, 0, 1)');
        else if (Status === "Manutenção")
          setColor('rgba(0, 0, 0, 0.4)');
      }, [Status]);

    return(
        <div style = {{marginRight: '10px', position:"absolute"}}>
            <div style = {{display: "flex",backgroundColor: color, width: 15, height: 15, borderRadius:15, justifyContent: "center"}}>
                <div style = {{backgroundColor: 'rgba(256, 256, 256, 0.4)', width: 10, height: 10, borderRadius: 10, alignSelf:"center"}} />
            </div>
        </div>
    ) 
};
