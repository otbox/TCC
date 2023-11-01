import { useNavigation } from "@react-navigation/native";
import { Button, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import NotificationBall, { NotificationBallProps } from "./NotificationBall";
import Paper from "./Paper";
import { useState, useEffect } from "react";

interface EstufaProps {
    onClick? : () => void, 
    caution? : Number,
    nome? : String,
    temp? : Number,
    umid? : Number, 
    idEstufa : Number,
    Status?: string,
    DiasCultivo?: Number,
    idEmpresa: Number,
}

export default function EstufaButton({nome , temp, umid, caution, onClick, idEstufa, Status, DiasCultivo, idEmpresa} : EstufaProps) {
    const navigation = useNavigation();
    const [StatusBall, setStatusBall] = useState<NotificationBallProps>({Status: "Maintenance"})
    const AcessandoEstufa = () => {
        const statusName = StatusBall.Status;
        navigation.navigate("EstufaProfile", {idEmpresa: idEmpresa,idEstufa: idEstufa, nome: nome, diasCultivo: DiasCultivo, ultTemp0: temp, ultUmid0: umid, statusName});
    }
    
    useEffect(() => {
        switch(Status){
            case "0":
                setStatusBall({Status: "Off"})
            break
            case "1":
                setStatusBall({Status: "Working"})
            break
            case "2":
                setStatusBall({Status: "Suspended"})
            break
            case "3":
                setStatusBall({Status: "Maintenance"})
            break
        }
    }, [Status])
    
    return (
        <TouchableOpacity onPress={AcessandoEstufa}> 
            <Paper style={style.constainer}>
                <NotificationBall Status={StatusBall.Status}/>
                <Image source={require('../assets/estufa.png')} style = {{width: 100 , height: 100}} />
                {/* <Text> {nome}</Text> */}
                <Text style = {{color: '#708090', alignSelf:"center", fontSize:25, marginLeft: 10}}>{nome}</Text>
                <View style= {{flex: 1 , flexDirection:"column-reverse",marginLeft: 90}}>
                    {/* <View style = {style.termo}><View style= {style.ponta}></View> </View> */}
                    <Text style = {{color:'#ffa500', fontSize: 20}}>  {temp}ºC</Text>
                    <Text style = {{color:'#4CC1DE', fontSize: 20}}> {umid}% </Text> 
                </View>
            </Paper>
        </TouchableOpacity>  
    )
};

const style = StyleSheet.create({
    constainer: {
        width: '95%',
        height: 100,
        flexDirection:"row",
        marginBottom: 15,
        elevation: 0,
    },
    termo: {
        width: 10, 
        height: 45,
        backgroundColor: '#a7fc00',
        borderColor: '#a7fc00',
        borderWidth: 2,
        borderRadius: 18,
    },
    ponta: {
        width: 19,
        bottom: -30,
        height: 19,
        borderRadius: 100,
        backgroundColor: '#a7fc00',
        marginLeft: -6
    },
})
