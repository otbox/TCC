import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { PostToPHP } from "../components/Api";

export interface EstufaProps {
    idEmpresa: number,
    idEstufa: number,
    nome: string, 
    temperatuta: number, 
    umidade: number,
    diasCultivo: number,
    status: number,
    notifs: string
}

export default function EstufaView() {
    //inicializaçõa de variaveis do Dashboard
    const {state} = useLocation();
    const {EstufaInfoRoute} = state; 

    //Variveis Próprias 
    const [EstufaInfo, setEstufaInfo] = useState<EstufaProps>(EstufaInfoRoute)

    useEffect(() => {
        PostToPHP({Operation: 'getEstufa', Content:{idEmpresa: EstufaInfo.idEmpresa, idEstufa: EstufaInfo.idEstufa}})
        .then((result) => {})
    },[])
    return (
        <>

        </>
    )
}