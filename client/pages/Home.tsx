import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native/";
import { useAppSelector } from "./hooks";
import { SelectUser } from "../shared/Store/reducers/userReducer";
import EstufaButton from "../components/EstufaButton";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect} from 'react'
import axios from "axios";
import { Button } from "react-native";
import ApiVerify from "../components/ApiVerify";
import { ScrollView } from "react-native";
import UltAttNoti from "../components/UltAttNoti";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text1 from "../components/Text";

export default function Home() {
    const navigation = useNavigation();
    const [Estufas, SetEstufas] = useState([])
    const bb = useAppSelector(SelectUser);
    const [Reload, SetReload] = useState(1)
    const [currentDate, setCurrentDate] = useState(new Date());
    const address = "https://otboxserver.000webhostapp.com/Connect.php";
    useEffect(() => {
        axios.post(address, {
            Operation: 'getAllEstufas',
            Content:{
                idEmpresa: bb?.idEmpresa,
            }
        }).then((response : any) => {
            const mappedResult = response.data.map((item : any) => {
                return {idEstufa : item[0],
                idEmpresa : item[1],
                nome : item[2],
                diasCultivo : item[4],
                temperatura : item[9],
                tempAlvo: item[5],
                umidAlvo: item[6],
                umidade : item[10],
                status : item[7],
                notifs : item[8],
            }})
            console.log(mappedResult)
            SetEstufas(mappedResult)
            setCurrentDate(new Date());
        })
    }, [Reload])

    const LogOut = async () => {
        try {
            await AsyncStorage.removeItem("key");
            navigation.goBack();
        }catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style= {{marginRight: 20}} onPress={LogOut}>
                    <Ionicons name="exit" size={32} color="white" />
                </TouchableOpacity>
            )
        });
    },[navigation]) 

    return (
        <SafeAreaView>
            <ScrollView style ={{paddingHorizontal: 5}}>
                <UltAttNoti UltimaData={currentDate} navigation={navigation} OnClick={() => SetReload(Reload + 1)}/>
                <View style = {{backgroundColor: '#F0F2EF'}}>
                    {Array.isArray(Estufas) && Estufas.map((data) => {
                        return(
                            <EstufaButton umidAlvo={data.umidAlvo} tempAlvo={data.tempAlvo} idEmpresa={data.idEmpresa}  DiasCultivo={data.diasCultivo} Status={data.status} key={data.idEstufa} idEstufa={data.idEstufa} nome={data.nome} temp={data.temperatura} umid={data.umidade}/>
                        ) 
                    })}

                </View>
            </ScrollView>
        </SafeAreaView>
    )   
};
