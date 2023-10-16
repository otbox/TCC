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


function App() {
  interface StateProps{
    result: string[][];
  }
  const { result } = useLocation().state as StateProps;
  const [SuperUser, setSuperUser] = useState<UserInterface>()
  const [EstufaList, setEstufaList] = useState<EstufaProps[]>()
  const nav = useNavigate()
   
  useEffect(() => {
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
        temperatuta : item[5],
        umidade : item[6],
        status : item[7],
        notifs : item[8],
      }))
      console.log(mappedResult)
      setEstufaList(mappedResult);
    })
    : ''
  },[SuperUser])

  useEffect(() => {})
  return (
    <>
      <header>
        <ExitButton />
        <p style={{fontSize: '4vw'}}>DashBoard</p>
        <div className="menu">
          <Button onClick={() => {nav('/userManagement', {state: {params: SuperUser?.idEmpresa}})}} style={{color: 'black'}} variant="outlined" >Gerenciar Usuários</Button>
          {/* <HoverButton key={1} title="Úsuarios" texts={menu1} params= {SuperUser?.idEmpresa } /> */}
        </div>
      </header>
      <hr />
      <div className="DashBoard-Container">
        <p>Ultima Atualização:</p>
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
