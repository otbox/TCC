import { View } from "react-native";
import { useState, useEffect } from 'react';


type NotificationBallProps = {
    Status : "Safe" | "Warning" | "Problem"
} 

export default function NotificationBall({Status} : NotificationBallProps) {
    const [color, setColor] = useState<string>()
    useEffect(() => {
        if (Status === "Safe")
          setColor('rgba(0, 128, 0, 1)');
        else if (Status === "Warning")
          setColor('rgba(255, 173, 45, 1)');
        else if (Status === "Problem")
          setColor('rgba(255, 0, 0, 1)');
      }, [Status]);

    return(
        <View style = {{marginLeft: '95%', position:"absolute"}}>
            <View style = {{backgroundColor: color, width: 15, height: 15, borderRadius:15, justifyContent: "center"}}>
                <View style = {{backgroundColor: 'rgba(256, 256, 256, 0.4)', width: 10, height: 10, borderRadius: 10, alignSelf:"center"}} />
            </View>
        </View>
    ) 
};
