import { useState, useEffect } from 'react';


export type NotificationBallProps = {
    Status : "Working" | "Suspended" | "Off" | "Maintenance" | string
} 

export default function NotificationBall({Status} : NotificationBallProps) {
    const [color, setColor] = useState<string>()
    useEffect(() => {
        if (Status === "Working")
          setColor('rgba(0, 128, 0, 1)');
        else if (Status === "Suspended")
          setColor('rgba(255, 173, 45, 1)');
        else if (Status === "Off")
          setColor('rgba(255, 0, 0, 1)');
        else if (Status === "Maintenance")
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
