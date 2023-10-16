import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { PostToPHP } from "../components/Api";
import { Area, AreaChart, CartesianGrid, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import BackButton from "../components/BackButton";
import { Paper } from "@mui/material";

export interface EstufaProps {
    idEmpresa: number,
    idEstufa: number,
    nome: string, 
    temperatuta: number, 
    umidade: number,
    diasCultivo: number,
    status: string,
    notifs: string
}
interface historico {
    id: number,
    temperatura: number,
    data: Date,
    umidade: string,
}


//Configuração da coluna da Tabela
const columns: GridColDef[] = [
    { field: 'data', headerName: 'Data', type:"Date", flex: 1 },
    { field: 'temperatura', headerName: 'Temperatura', type: "number", width: 200, headerAlign: 'center', align: "center" },
    { field: 'umidade', headerName: 'Umidade', type: "number", width: 200,  headerAlign: 'center', align: "center" },
  ];

export default function EstufaView() {
    //inicializaçõa de variaveis do Dashboard
    const EstufaInfoRoute = useLocation().state as EstufaProps;
    const {idEmpresa, idEstufa, diasCultivo} = EstufaInfoRoute
    //Variveis Próprias 
    const [TimeNow, setTimeNow] = useState<string>()
    const [historico, setHistorico] = useState<historico[]>([])
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
            const mappedRes = result.map((item : any, index : any) => ({
                id: index,
                temperatura: item[2],
                umidade: item[3],
                data: item[1]
            }))
            setHistorico(mappedRes)
        })
    },[])
    useEffect(() => {
    },[historico])
    let slicedTemp = historico.slice(12,20)
    return (
        <>
            <BackButton />
            <div style={{display: 'flex', justifyContent: 'space-between', margin: 10}}>
                <p>Hoje é o Dia {diasCultivo} do Cultivo</p>
                <p>Ultima atualização: {TimeNow}</p>
            </div>
            <div style={{display: "flex", flex: 1, justifyContent: "center"}}>
                <ResponsiveContainer width={"80%"} height={250} >
                    <AreaChart data={historico}
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
                </ResponsiveContainer>
            </div>
            <div style={{margin:'10%', marginTop: 45, display: "flex", flex: 1, justifyContent: "center"}}>
                <div style={{display:'flex', height: 400, width: '50%'}}>
                <DataGrid
                    rows={historico}
                    //getRowId={(row : historico) => row.data}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                />
                </div>
                <div style={{display:'flex',flexDirection: "column" , marginLeft: 20, justifyContent: 'space-between', height: 400, width: '50%'}}>
                    <Paper elevation={2} style={{height: '45%'}}>
                        <div>
                            <p>Ultimos 8 Registros</p>
                            <RadialBarChart 
                                width={300} 
                                height={250} 
                                innerRadius="20%" 
                                outerRadius="90%" 
                                data={slicedTemp} 
                                startAngle={180} 
                                endAngle={0}
                                >
                                    <RadialBar  fill="orange" label={{display:'none'}} background dataKey='temperatura' />
                                    <Tooltip />
                            </RadialBarChart>
                        </div>
                    </Paper>
                    <Paper elevation={2} style={{height: '45%'}}>
                    <div>
                            <p>Ultimos 8 Registros</p>
                            <RadialBarChart 
                                width={300} 
                                height={250} 
                                innerRadius="20%" 
                                outerRadius="90%" 
                                data={slicedTemp} 
                                startAngle={180} 
                                endAngle={0}
                                >
                                    <RadialBar  fill="#8884d8" label={{display:'none'}} background dataKey='umidade' />
                                    <Tooltip />
                            </RadialBarChart>
                        </div>
                    </Paper>
                </div>
            </div>

        </>
    )
}