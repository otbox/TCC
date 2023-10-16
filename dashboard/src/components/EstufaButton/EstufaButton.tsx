import { EstufaProps } from "../../pages/EstufaView";
import { useNavigate } from "react-router-dom";
import EstufaImage from "./estufa.png"
import UmidImage from "./umid.png"
import TempImage from "./temp.png"
import { Paper } from "@mui/material";
import './style.css'
import NotificationBall, { NotificationBallProps } from "./NotificationBall";
import { useEffect, useState } from "react";

export default function EstufaButton({idEmpresa, idEstufa, diasCultivo, nome, temperatuta, umidade, status}: EstufaProps) {
    //const [EstufaInfo, setEstufaInfo] = useState<EstufaProps>({diasCultivo})
    const nav = useNavigate();
    const [StatusBall, setStatusBall] = useState<NotificationBallProps>({Status: "Maintenance"})

    const useNav = () =>{
        nav("/EstufaPage", {state : {idEmpresa, idEstufa, diasCultivo, nome, temperatuta, umidade}})
    } 

    useEffect(() => {
        console.log('status'+status)
        switch(status){
            case "0":
                setStatusBall({Status: "Off"})
            break
            case "1":
                setStatusBall({Status: "Working"})
            break
            case "2":
                setStatusBall({Status: "Suspended"})
            break
            case "3":
                setStatusBall({Status: "Maintenance"})
            break
        }
        console.log(StatusBall)
    }, [status])

    return (
        <Paper elevation={2} onClick={useNav} style={{borderRadius:13, display: "flex", alignItems: 'center', cursor:'pointer', marginTop: '10px'}}>
            <img src={EstufaImage} height={100} width={100} style={{margin: 10}}/>
            <p id="title">{nome}</p>
            <div style={{display: 'flex', width: '100%', justifyContent: "space-between"}}>
                <div className="info">  
                    <div style={{display: "block",width: '30%', marginRight: '40px'}}>
                        <p id="pCultivo"    >Dia de Cultivo: {diasCultivo}</p>
                        <div style={{justifyContent: "space-between", marginRight:'20px'}}>
                            <div>
                                <img src={TempImage} alt="" />
                                <p id="pTemperatura">{temperatuta}ºC</p>
                            </div>
                            <div>
                                <img src={UmidImage} alt="" />
                                <p id="pUmidade"    >{umidade}%</p>
                            </div>
                        </div>
                    </div>
                <NotificationBall Status={StatusBall.Status} />
                </div>
            </div>
        </Paper>
    );
};
