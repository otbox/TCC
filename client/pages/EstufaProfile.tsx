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

interface historico {
  id: number,
  temperatura: number,
  data: Date,
  umidade: string,
}

const lineData = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];

export default function EstufaProfile({route}) {
    const navigation = useNavigation();
    const [Reload, SetReload] = useState<number>(1)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [dados, setdados] = useState<historico[]>([]);
    const [pag, setPag] = useState<number>(20)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [TempMax, setTempMax] = useState<number>();
    const [dadosGraf, setDadosGraf] = useState<any[]>([])
    const {ultTemp0, ultUmid0,nome, diasCultivo} = route.params;
    const [ultTemp, setUltTemp] = useState<number>(ultTemp0)
    const [ultUmid, setUltUmid] = useState<number>(ultUmid0)
    const address = "https://otboxserver.000webhostapp.com/Connect.php";

    interface historico {
      idEstufa : number,
      data : Date,
      temperatura: number, 
      umidade: number
    }

    useEffect(() => {
       axios.post(address,{Operation: "getEstufa",Content:{idEmpresa: 1, idEstufa: route.params.idEstufa}}).then((response) => {
          const dados = response.data;
          const dadosMapeados : historico[] = dados.map((pesquisa : any) => {
            return {
            idEstufa: pesquisa[0],
            data: pesquisa[1],
            temperatura: pesquisa[2],
            umidade: pesquisa[3]
            }
          })
          console.log(dadosMapeados)
          setdados(dadosMapeados);
          setDadosGraf(dadosMapeados.reverse());
          const tempArray = dadosMapeados.map((temperatura) => {return(temperatura.temperatura)});
          const tempMax = Math.max(...tempArray) + 5;
          console.log(TempMax)
          setTempMax(tempMax);
          const pag = dados.length - 5  
          setPag(pag)
          const ultDado = dados[dados.length - 1] 
          setUltTemp(ultDado[2])
          setUltUmid(ultDado[3])
          setLoaded(true)
       }).catch((error : any) => {console.log(error)})
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
    // const previous = () => {
    //   if (pag - 5 >= 0) {
    //     const pag1 = pag - 5;
    //     setPag(pag1);
    //   }else{
    //     const pag1 = 0;
    //     setPag(pag1);
    //   }
    // };
  
    // const next = () => {
    //   if (pag + 5 <= dados.length - 5) {
    //     const pag1 = pag + 5;
    //     setPag(pag1);
    //   }
    // };
  
    useEffect(() => {
      if(loaded){ 
        const dadosGraf = dados.slice(pag, pag + 5);
        setDadosGraf(dadosGraf);
        const tempArray = dadosGraf.map(({ temperatura }) => temperatura);
        const tempMax = Math.max(...tempArray) + 1;
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
                     <VictoryChart domainPadding={{x: [0, 0], y: 5}} theme={VictoryTheme.material}> 
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
                          x={"data"}
                          y={"temperatura"}
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
                        
                      
                      </View>
                    </View>
                    <View>
                    <Text style = {{fontWeight: "bold", margin:10}}>Ultimos Registros: </Text>
                    {/* Tabela de datas */}
                    <ScrollView style = {{height: 300, backgroundColor: 'aliceblue'}} >
                          {dados.map((data, index) =>(
                          <View key={index} style = {{flexDirection:"row"}}>
                            {/* Data e Hora */}
                            <Text style = {style.dados}>{new Date(data.data).toLocaleString([], {day: "2-digit", month:"2-digit"})}</Text>
                            <Divider />
                            <Text style = {style.dados}>{new Date(data.data).toLocaleTimeString([],{hour: "2-digit", minute: "2-digit"})}</Text>
                            <Divider />
                            {/* Temperatura e umidade da tabela */}
                            <Text style = {style.dados}>{data.temperatura}ºC</Text>
                            <Divider />
                            <Text style = {style.dados}>{data.umidade}%</Text>
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