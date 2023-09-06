import axios from "axios";
import { useEffect, useState } from "react";
import { Button, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView, Text } from "react-native";
import { Defs, Stop,LinearGradient } from "react-native-svg";
import { VictoryArea,VictoryAxis,VictoryChart, VictoryContainer,VictoryTheme } from "victory-native";
import ApiVerify from "../components/ApiVerify";
import Paper from "../components/Paper";
import UltAttNoti from "../components/UltAttNoti";
import { useNavigation } from "@react-navigation/native";
import Divider from "../components/Divider";
import Swiper from "react-native-swiper";
import { Button2 } from "../components/Button2";
import PdfPageGenerator from "../components/PdfPageGenerator";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

interface EstufaPropsProf {
    caution? : Number,
    nome? : String,
    temp? : Number,
    umid? : Number, 
}

const lineData = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];

export default function EstufaProfile({route}) {
    const navigation = useNavigation();
    const [Reload, SetReload] = useState<number>(1)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [dados, setdados] = useState<any[]>([]);
    const [pag, setPag] = useState<number>(20)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [Temp, setTemp] = useState<number[]>([]);
    const [TempMax, setTempMax] = useState<number>();
    const [dadosGraf, setDadosGraf] = useState<any[]>([])
    const {ultTemp0, ultUmid0,nome, diasCultivo} = route.params;
    const [ultTemp, setUltTemp] = useState<number>(ultTemp0)
    const [ultUmid, setUltUmid] = useState<number>(ultUmid0)
    const [clickable, setClickable] = useState<boolean>(false)

    useEffect(() => {
       axios.post(ApiVerify() +'GetEstufaProfile',{idEstufa: route.params.idEstufa}).then((response) => {
          const dados = response.data;
          setdados(dados);
          setDadosGraf(dados)
          const tempArray = dados.map(({ Temp }) => Temp);
          setTemp(tempArray);
          const tempMax = Math.max(...tempArray) + 5;
          setTempMax(tempMax);
          const pag = dados.length - 5 
          setPag(pag)
          const ultDado = dados[dados.length - 1] 
          setUltTemp(ultDado.Temp)
          setUltUmid(ultDado.Umi)
          setLoaded(true)
       }).catch((error) => {console.log(error)})
       navigation.setOptions({
        title: "Estufa: " + nome,
       })
       setCurrentDate(new Date());
    },[Reload])

    // const previous = () => {
    //   console.log("a"+pag)
    //   if (pag - 5 > 0) {
    //     const dadosGraf = dados.slice(pag - 5, pag)
    //     setDadosGraf(dadosGraf)
    //     const pag1 = pag - 5
    //     setPag(pag1); 
    //     const tempArray = dadosGraf.map(({ Temp }) => Temp);
    //     const tempMax = Math.max(...tempArray) + 5;
    //     setTempMax(tempMax);
    //   }
    //   console.log(pag)
    // }
    // const next = () => {
    //   console.log("b"+pag)
    //   if (pag + 5 <= dados.length - 5) {
    //     const dadosGraf = dados.slice(pag, pag + 5)
    //     setDadosGraf(dadosGraf)
    //     const pag1 = pag + 5
    //     setPag(pag1); 
    //     const tempArray = dadosGraf.map(({ Temp }) => Temp);
    //     const tempMax = Math.max(...tempArray) + 5;
    //     setTempMax(tempMax);
    //   }
    //   console.log(pag)
    // }
    const previous = () => {
      if (pag - 5 >= 0) {
        const pag1 = pag - 5;
        setPag(pag1);
      }else{
        const pag1 = 0;
        setPag(pag1);
      }
    };
  
    const next = () => {
      if (pag + 5 <= dados.length - 5) {
        const pag1 = pag + 5;
        setPag(pag1);
      }
    };
  
    useEffect(() => {
      if(loaded){ 
        const dadosGraf = dados.slice(pag, pag + 5);
        setDadosGraf(dadosGraf);
        const tempArray = dadosGraf.map(({ Temp }) => Temp);
        const tempMax = Math.max(...tempArray) + 5;
        setTempMax(tempMax);
      }
    }, [pag, dados]);
    //const { temp, umid,caution} = props
    
    return (
        <SafeAreaView> 
          <ScrollView>
          <UltAttNoti UltimaData={currentDate} OnClick={() => SetReload(Reload + 1)} navigation={navigation}/>
            <View style = {{flexDirection: "row", height: 150, marginHorizontal: 5, justifyContent: "space-between"}}>
              <Paper style={{flex: 1, padding: 10}}>
                {loaded ? (<Button2 height={120} width={175} onClick={() => PdfPageGenerator({data: dados, nomeEstufa: nome})} label={"PDFGerator"}/>) : (<Text>Loading...</Text>)}   
              </Paper>
              <View>
                <Paper style={{flex: 1, padding: 14}}>
                  <Text style= {{marginTop: -5}}>Ultima Atualização:</Text>
                  <View style= {{marginTop: 5, flexDirection: "row", justifyContent: "space-around"}}>
                    <Text style = {{color:'#ffa500', fontSize: 20}}>  {ultTemp}ºC</Text>
                    <Divider />
                    <Text style = {{color:'#4CC1DE', fontSize: 20}}> {ultUmid}% </Text> 
                  </View>
                </Paper>
                <Paper style={{flex: 1, padding: 3, flexDirection: "row", justifyContent: "space-around"}}>
                  <Text style= {{fontSize: 15, alignSelf: "center"}}>Dias de {"\n"}Cultivo:</Text>
                  <Text style= {{fontSize: 28, alignSelf: "center"}}>{diasCultivo}</Text>
                </Paper>
              </View>
            </View>
            
            <Paper style={{height: 500}}>
                {loaded ? (
                  <Swiper loop={false}>
                    <View style={{marginTop: -30}}>
                      <VictoryChart maxDomain={{y :TempMax}} theme={VictoryTheme.material}> 
                          <VictoryAxis
                            dependentAxis
                            tickFormat={(x) => `${x}°C`}
                            label=""
                          />
                          <VictoryAxis
                            tickFormat={(x) => new Date(x).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            style={{axisLabel: {padding: 30}, tickLabels: {angle: -90, padding: 15}}}
                          />
                        <VictoryArea
                          data={dadosGraf}
                          x={"Momento"}
                          y={"Temp"}
                          interpolation="natural"
                          animate = {{
                            onLoad:{
                              duration: 1500,
                            }
                          }}
                          style={{ data: { fill: 'url(#gradient)' }, labels: {fontSize: 15}}}
                        />
                          <Defs>
                            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                              <Stop offset="10%" stopColor="orange" stopOpacity={1} />
                              <Stop offset="100%" stopColor="orange" stopOpacity={0} />
                            </LinearGradient>
                        </Defs> 
                      </VictoryChart>
                      <View style={{flexDirection:"row", backgroundColor: 'red'}}>  
                        {clickable ? (
                          <View>
                            <Button title="Prev" onPress={previous} /> 
                            <Button title="Next" onPress={next} />
                          </View>
                        ) : (
                          <TouchableOpacity style= {{left: 220}} onPress={() => {previous(); setClickable(true)}}>
                            <View style={{backgroundColor: "aliceblue"}}>
                              <MaterialIcons size={36} name="zoom-in"/>
                            </View>
                          </TouchableOpacity>
                        )}
                      
                      </View>
                    </View>
                    <View>
                    <Text style = {{fontWeight: "bold", margin:10}}>Ultimos Registros: </Text>
                    <ScrollView style = {{height: 300, backgroundColor: 'aliceblue'}} >
                          {dados.map((data, index) =>(
                          <View key={index} style = {{flexDirection:"row"}}>
                            <Text style = {style.dados}>{new Date(data.Momento).toLocaleString([], {day: "2-digit", month:"2-digit"})}</Text>
                            <Divider />
                            <Text style = {style.dados}>{new Date(data.Momento).toLocaleTimeString([],{hour: "2-digit", minute: "2-digit"})}</Text>
                            <Divider />
                            <Text style = {style.dados}>{data.Temp}ºC</Text>
                            <Divider />
                            <Text style = {style.dados}>{data.Umi}%</Text>
                          </View>))}
                    </ScrollView>
                  </View>
                </Swiper>
                ) : (<Text>Loading...</Text>)}                
            </Paper>
          </ScrollView>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
  dados: {
    flex:1, 
    textAlign:"center",
  }
})