import { useEffect, useState } from "react";
import "./App.css";
import HoverButton from "./components/menu/HoverButton/HoverButton";
import { menu1 } from "./components/menu/links";
import axios from "axios";
import { PostToPHP } from "./components/Api";
import { useLocation } from "react-router-dom";

function App() {
  const { state } = useLocation();
  const { result } = state;

  useEffect(() => {
    console.log("foi " + result[0][4]);
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
          <HoverButton key={1} title="Úsuarios" texts={menu1} />
          <HoverButton key={2} title="teste" texts={menu1} />
          <HoverButton title="teste" texts={menu1} />
          <HoverButton title="teste" texts={menu1} />
        </div>
      </header>
      <hr />
      <div className="DashBoard-Container">
        <p>Ultima Atualização:</p>
      </div>
    </>
  );
}

export default App;
