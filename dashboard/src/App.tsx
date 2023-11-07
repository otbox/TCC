import { useEffect, useState } from "react";
import "./App.css";
import { PostToPHP } from "./components/Api";
import { useLocation, useNavigate } from "react-router-dom";
import UserInterface from "./components/userInterface";
import EstufaButton from "./components/EstufaButton/EstufaButton";
import { EstufaProps } from "./pages/EstufaView";
import { Button } from "@mui/material";
import { ExitButton } from "./components/BackButton";
//import EstufaButton from "./components/EstufaButton/EstufaButton";

//Contrução da Home do site 

function App() {
  interface StateProps{
    result: string[][];
  }
  const { result } = useLocation().state as StateProps;
  const [SuperUser, setSuperUser] = useState<UserInterface>()
  const [EstufaList, setEstufaList] = useState<EstufaProps[]>()
  const [TimeNow, setTimeNow] = useState<string>()
  const nav = useNavigate()
   
  useEffect(() => {
    const now = new Date();
    const second = now.getSeconds()
    const min = now.getMinutes()
    const hour = now.getHours()
    setTimeNow(String(hour) + ':' + String(min)+ ':' + String(second))

    if (result && result[0]) {
    console.log("foi " + result[0]);
    setSuperUser({
      name: result[0][3],
      ativo: result[0][5],
      nivel: result[0][4], 
      idEmpresa: result[0][1],
      passw: result[0][2]   
    })
  }
  }, []);

  //Aquisição das Estufas da Empresa, para Exibi-las depois
  useEffect(() => {
    SuperUser ? 
    PostToPHP({Operation: 'getAllEstufas', Content: {
      idEmpresa : SuperUser.idEmpresa
    }}).then((result: any) => {
      const mappedResult = result.map((item : any) => ({
        idEstufa : item[0],
        idEmpresa : item[1],
        nome : item[2],
        diasCultivo : item[4],
        temperatuta : item[9],
        umidade : item[10],
        status : item[7],
        notifs : item[8],
        ultdata: item[11]
      }))
      setEstufaList(mappedResult);
    })
    : ''
  },[SuperUser])

  return (
    <>
      <header>
        <ExitButton />
        <p style={{fontSize: '4vw'}}>Painel de Controle</p>
        <div className="menu">
          <Button onClick={() => {nav('/userManagement', {state: {params: SuperUser?.idEmpresa}})}} style={{color: 'black'}} variant="outlined" >Gerenciar Usuários</Button>
          {/* <HoverButton key={1} title="Úsuarios" texts={menu1} params= {SuperUser?.idEmpresa } /> */}
        </div>
      </header>
      <hr />
      <div className="DashBoard-Container">
        <p>Ultima Atualização: {TimeNow}</p>
        {EstufaList ? EstufaList.map((item, index) => {return (
          <EstufaButton 
            idEmpresa={item.idEmpresa} 
            idEstufa={item.idEstufa} 
            diasCultivo={item.diasCultivo} 
            nome={item.nome} 
            notifs={item.notifs} 
            temperatuta={item.temperatuta}
            status={item.status}
            umidade={item.umidade}
            key={index}
            />
        )}): <p>Loading...</p>}
      </div>
    </>
  );
}

export default App;
