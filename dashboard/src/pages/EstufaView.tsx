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
interface historico {
    temperatura: number,
    data: string,
    umidade: string,
}
export default function EstufaView() {
    //inicializaçõa de variaveis do Dashboard
    const EstufaInfoRoute = useLocation().state as EstufaProps;
    const {idEmpresa, idEstufa, diasCultivo, nome, notifs,status,temperatuta,umidade} = EstufaInfoRoute
    const {}
    //Variveis Próprias 

    useEffect(() => {
        console.log(EstufaInfoRoute)
        PostToPHP({Operation: 'getEstufa', Content:{idEmpresa: idEmpresa, idEstufa: idEstufa}})
        .then((result : any) => {
            console.log(result)
        })
    },[])
    return (
        <>
            <div>aaaa</div>
        </>
    )
}