import { useNavigation } from "@react-navigation/native";
import { Button, Image, Pressable, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import NotificationBall from "./NotificationBall";
import Paper from "./Paper";

interface EstufaProps {
    onClick? : () => void, 
    caution? : Number,
    nome? : String,
    temp? : Number,
    umid? : Number, 
    idEstufa : Number,
}

export default function EstufaButton(props : EstufaProps) {
    const {nome , temp, umid, caution, onClick, idEstufa} = props;

    const navigation = useNavigation();
    const AcessandoEstufa = () => {
        navigation.navigate("EstufaProfile", {idEstufa: props.idEstufa, nome: props.nome});
    }

    return (
        <TouchableOpacity onPress={AcessandoEstufa}> 
            <Paper style={style.constainer}>
                <NotificationBall Status="Safe"/>
                <Image source={require('../assets/estufa.png')} style = {{width: 100 , height: 100}} />
                {/* <Text> {nome}</Text> */}
                <Text style = {{color: '#708090', alignSelf:"center", fontSize:25, marginLeft: 10}}>{nome}</Text>
                <View style= {{flex: 1 , flexDirection:"row-reverse", alignSelf:"flex-end", marginRight: 20, alignContent: "space-between"}}>
                    {/* <View style = {style.termo}><View style= {style.ponta}></View> </View> */}
                    <Text style = {{color:'#b2dfee', fontSize: 20}}> {umid}% </Text> 
                    <Text style = {{color:'#ffa500', fontSize: 20}}>  {temp}ºC</Text>
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
