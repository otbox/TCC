import { TextField, InputAdornment, Button } from "@mui/material";
import { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import { PostToPHP } from "../components/Api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ErrorAlertC } from "../components/Alerts";

export default function Login() {
  const nav = useNavigate();
  const [user, setUser] = useState<string>("");
  const [passw, setPassword] = useState<string>("");
  const [ErrorAlert, setErrorAlert] = useState<{text: string, tipo: "error" | "success" | "info"}[]>([]);

  useEffect(() => {
    const user = Cookies.get("user");
    const passw = Cookies.get("passw");
    setUser(user!);
    setPassword(passw!);
    if (user != null && passw != null) {
      console.log("funfa");
      VerifyAccount(user, passw);
    }
  }, []);

  const handleShowAlertError = (alertText : string, TipoAlert: "error" | "success" | "info") => {
    setErrorAlert(prevAlerts => [...prevAlerts, {text: alertText, tipo: TipoAlert}]);
  }

  const VerifyAccount = (user: string, passw: string) => {
    if (user == null || passw == null) {
      handleShowAlertError("Insira um Usuário e Senha", 'info');
      return;
    }
    PostToPHP({
      Operation: "VerifyAccount",
      Content: {
        user,
        passw,
      },
    })
      .then((result : any) => {
        console.log(result);
        //aquisição do resultado do banco e depois a definir em variaveis, [][] é necessário por causa do array de objetos vindos pelo php
        const phpNome = result[0][3];
        const phpPassw = result[0][4];
        const phpAtivo = result[0][5];
        const phpNivel = result[0][2];
        if (phpAtivo == 0) {handleShowAlertError('Você não está Ativo', 'error'); return;}
        if (phpNivel == 0) {handleShowAlertError('Você não tem permissão', 'error'); return;}
        if (phpNome === user && phpPassw === passw) {
          Cookies.set("user", phpNome);
          Cookies.set("passw", phpPassw);
          nav("/Homepage", { state: { result } });
        }
      })
      .catch((error) => {
        error === -1 ? handleShowAlertError("Usuário ou Senha Incorretos", 'info') : handleShowAlertError("Erro com Servidor",'error');
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <p style={{ fontSize: 25, fontWeight: "bold" }}>Login</p>
      <TextField
        label="Usuário"
        //style={{marginTop: 30, marginBottom: 15}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setUser(e.target.value)}
        color="primary"
      />{" "}
      <br />
      <TextField
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
        label="Senha"
        type="password"
      />
      <Button
        variant="contained"
        onClick={() => {
          VerifyAccount(user, passw);
        }}
        style={{ marginTop: 15 }}
      >
        Entrar
      </Button>
      <div>
      {ErrorAlert.map((alert, index) => (
                <ErrorAlertC key={index} text={alert.text} tipo={alert.tipo}/>
        ))}
      </div>
    </div>
  );
}
