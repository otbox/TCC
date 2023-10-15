import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { PostToPHP } from "../components/Api";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { NotificationBallProps } from "../components/EstufaButton/NotificationBall";

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
    data: Date,
    umidade: string,
}
export default function EstufaView() {
    //inicializaçõa de variaveis do Dashboard
    const EstufaInfoRoute = useLocation().state as EstufaProps;
    const {idEmpresa, idEstufa, diasCultivo, nome, notifs,status,temperatuta,umidade} = EstufaInfoRoute
    //Variveis Próprias 
    const [TimeNow, setTimeNow] = useState<string>()
    const [historico, setHistorico] = useState<historico[] | undefined>()
    useEffect(() => {
        const now = new Date();
        const second = now.getSeconds()
        const min = now.getMinutes()
        const hour = now.getHours()
        setTimeNow(String(hour) + ':' + String(min)+ ':' + String(second))


        console.log(EstufaInfoRoute)
        PostToPHP({Operation: 'getEstufa', Content:{idEmpresa: idEmpresa, idEstufa: idEstufa}})
        .then((result : any) => {
            console.log(result)
            setHistorico(result);
            const mappedRes = result.map((item : any) => ({
                temperatura: item[2],
                umidade: item[3],
                data: item[1]
            }))
            setHistorico(mappedRes)
        })
    },[])
    useEffect(() => {
    },[historico])
    return (
        <>
            <p>Hoje é o Dia {diasCultivo} do Cultivo</p>
            <AreaChart width={730} height={250} data={historico}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUmid" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eba834" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#eba834" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="data" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="umidade" stroke="#8884d8" fillOpacity={1} fill="url(#colorUmid)" />
                <Area type="monotone" dataKey="temperatura" stroke="#eba834" fillOpacity={1} fill="url(#colorTemp)" />
            </AreaChart>
            <p>{TimeNow}</p>
            <div>aaaa</div>
        </>
    )
}