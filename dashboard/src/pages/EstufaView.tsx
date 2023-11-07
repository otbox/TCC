import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { PostToPHP } from "../components/Api";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DataGrid, GridColDef} from "@mui/x-data-grid";
import BackButton from "../components/BackButton";
import { Button, Paper, TextField } from "@mui/material";

import downloadPdfButton from "../components/pdfGenerator";
import NotificationBall from "../components/EstufaButton/NotificationBall";
import { ErrorAlertC } from "../components/Alerts";

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
export interface historico {
    id: number,
    temperatura: number,
    data: Date,
    hour: string,
    umidade: string,
}


//Configuração da coluna da Tabela
const columns: GridColDef[] = [
    { field: 'data', headerName: 'Data', type:"Date", minWidth: 200, flex: 1 },
    { field: 'temperatura', headerName: 'Temperatura', type: "number", width: 200, headerAlign: 'center', align: "center" },
    { field: 'umidade', headerName: 'Umidade', type: "number", width: 200,  headerAlign: 'center', align: "center" },
  ];

export default function EstufaView() {
    //inicializaçõa de variaveis do Dashboard
    const EstufaInfoRoute = useLocation().state as EstufaProps;
    const {idEmpresa, idEstufa, diasCultivo, nome, status, temperatuta, umidade} = EstufaInfoRoute
    const [ErrorAlert, setErrorAlert] = useState<{text: string, tipo: "error" | "success"}[]>([]);
    //Variveis Próprias 
    const [TimeNow, setTimeNow] = useState<string>()
    const [historico, setHistorico] = useState<historico[]>([])
    const [tempAlvo, setTempAlvo] = useState<number>(temperatuta);
    const [umiAlvo, setUmiAlvo] = useState<number>(umidade);

    const changeAlvos = () => {
        console.log
        PostToPHP({Operation : 'UpdateAlvos', Content:{idEstufa, tempAlvo, umiAlvo}}).then((result : any) => {
            console.log(result)
            if (result == 'Success'){
                handleShowAlertError('Temperatura e Umidade desejadas atualizadas com Sucesso','success');
            }else{
                handleShowAlertError('Erro na Atualização', 'error');
            }
        }).catch((err) => {
            handleShowAlertError('Erro na Atualização' + err, 'error');
        })
    }

    const handleShowAlertError = (alertText : string, TipoAlert: "error" | "success") => {
        setErrorAlert(prevAlerts => [...prevAlerts, {text: alertText, tipo: TipoAlert}]);
    }

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
            const resultado = result.reverse()
            setHistorico(resultado);
            const mappedRes = resultado.map((item : any, index : any) => {
                let hour1 = new Date (item[1]).toLocaleString([], {hour: "2-digit", minute:"2-digit"})
                return {
                id: index,
                temperatura: item[2],
                umidade: item[3],
                data: item[1],
                hour: hour1
            }
            })
            setHistorico(mappedRes)
        })
    },[])
    useEffect(() => {
        console.log(historico)

    },[historico])

    function exportPdf () {
        return(
            downloadPdfButton({data: historico, nomeEstufa: nome})
        )
    }
    return (
        <> 
            <BackButton />
            <div id="notifysdiv">
              {ErrorAlert.map((alert, index) => (
                <ErrorAlertC key={index} text={alert.text} tipo={alert.tipo}/>
              ))}
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
                        <XAxis dataKey='hour' tickSize={10} />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="umidade" stroke="#8884d8" fillOpacity={1} fill="url(#colorUmid)" />
                        <Area type="monotone" dataKey="temperatura" stroke="#eba834" fillOpacity={1} fill="url(#colorTemp)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div style={{margin:'10%', marginTop: 45, display: "flex", flex: 1, justifyContent: "center"}}>
                <div style={{display:'flex', height: 420, width: '50%', minWidth:630}}>
                <DataGrid
                    rows={historico}
                    //getRowId={(row : historico) => row.data}
                    slots={{
                        toolbar: exportPdf
                    }}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    sorting : {
                        sortModel: [{field: 'data', sort: 'desc'}]
                    }
                    }}
                    pageSizeOptions={[5, 10]}
                    slotProps={{
                        pagination: {
                          labelRowsPerPage: "Número de linhas por página",
                        }
                       }}
                />
                </div>
                <div style={{display:'flex',flexDirection: "column" , marginLeft: 20, justifyContent: 'space-between', height: 420, width: '50%'}}>
                    <Paper elevation={2} style={{height: '45%', padding: 5}}>
                        <p style={{fontSize: '1rem'}}>Nome da Estufa : {nome}</p>
                        <p>Ultima atualização: {TimeNow}</p>
                        <hr />
                        <div style={{fontSize: 18, display: 'flex', height: '85%', marginTop: 5, flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div style={{flex:1}}>
                                <p>Dias de Cultivo nº</p>
                                <p style={{fontSize: 40, fontWeight:'400', textAlign: 'center'}}>{diasCultivo}</p>
                            </div> 
                            <div style={{ flex: 1,height: '80%',border: 'solid', paddingLeft: 10, borderWidth: 2, borderRight: 0, borderTop: 0, borderBottom:0, borderColor: 'rgba(40, 40, 40, 0.6)'}}>
                                <p>Status: </p>
                                <div style={{paddingTop: 15}}>
                                    <NotificationBall Status={status}/>
                                    <p style={{marginTop: -15, marginLeft: 30, fontSize: 30}}>{status}</p>
                                    {status === 'Ajustando' ? <p>Trabalhando para alcançar o ideal</p> : ''}
                                    {status === 'Ajustando' ? <p>Parâmetros estão ideais</p> : ''}
                                </div>
                            </div>
                        </div>
                    </Paper>
                    <Paper elevation={2} style={{height: '45%', padding: 10}}>
                        <div>
                            <p style={{fontSize: 20}}>Controle de Temperatura e Umidade</p>
                            <hr />
                            <div style={{marginTop: 10,display: 'flex', flex: 1, justifyContent: 'space-around'}}>
                                <TextField style={{marginRight: 10}} onChange={(e) => setTempAlvo(Number(e.target.value))} value={tempAlvo} color="error" variant={'filled'} label='Temperatura' type="number"/>
                                <TextField style={{marginLeft: 10}} onChange={(e) => setUmiAlvo(Number(e.target.value))} value={umiAlvo}  color="info" variant={'filled'} label='Umidade' type="number"/>
                            </div>
                            <Button style={{bottom: -20}} variant="contained" onClick={changeAlvos} >Aplicar</Button>
                        </div>
                    </Paper>
                </div>
            </div>

        </>
    )
}