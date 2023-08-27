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

    useEffect(() => {
        axios.post(ApiVerify() +'GetEstufas', {
            idEmpresa: bb?.idEmpresa,
        }).then((response) => {
            SetEstufas(response.data)
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
                    <Text1 fontWeight={1}>User:</Text1>
                    <Text>{bb?.id}</Text>
                    <Text>{bb?.name}</Text>
                    {/* <Text>{bb?.ativo}</Text> */}
                    <Text>{bb?.idEmpresa}</Text>
                    <Text>{bb?.nivel}</Text>
                    <Text>{bb?.ativo}</Text> 
                    {Array.isArray(Estufas) && Estufas.map((data) => {
                        return(
                            <EstufaButton DiasCultivo={data.DiasCultivo} Status={data.Status} key={data.idEstufa} idEstufa={data.idEstufa} nome={data.Nome} temp={data.TempAlvo} umid={data.UmiAlvo}/>
                        ) 
                    })}
                    <EstufaButton Status={1} idEstufa={3} nome={"teste"} temp={36}/>

                </View>
            </ScrollView>
        </SafeAreaView>
    )   
};
