import { useEffect, useState } from "react";
import "./App.css";
import HoverButton from "./components/menu/HoverButton/HoverButton";
import { menu1 } from "./components/menu/links";
import axios from "axios";
import { PostToPHP } from "./components/Api";
import { useLocation } from "react-router-dom";
import UserInterface from "./components/userInterface";
import EstufaButton from "./components/EstufaButton/EstufaButton";

function App() {
  const { state } = useLocation();
  const { result } = state;
  const [SuperUser, setSuperUser] = useState<UserInterface>()
   
  useEffect(() => {
    console.log("foi " + result[0]);
    setSuperUser({
      name: result[0][3],
      ativo: result[0][5],
      nivel: result[0][4], 
      idEmpresa: result[0][1],
      passw: result[0][2]
    })

    const Person = {
      Nome: "Abacaxi",
    };
    PostToPHP({ Operation: "select", Content: Person }).then((e) => {
      console.log(e);
    });
  }, []);

  return (
    <>
      <header>
        <h3>DashBoard</h3>
        <div className="menu">
          <HoverButton key={1} title="Úsuarios" texts={menu1} params= {SuperUser?.idEmpresa } />
          <HoverButton key={2} title="teste" texts={menu1} />
          <HoverButton title="teste" texts={menu1} />
          <HoverButton title="teste" texts={menu1} />
        </div>
      </header>
      <hr />
      <div className="DashBoard-Container">
        <p>Ultima Atualização:</p>
        <EstufaButton diasCultivo={2} idEmpresa={1} idEstufa={1} nome="tre" temperatuta={12} umidade={21}/>
      </div>
    </>
  );
}

export default App;
