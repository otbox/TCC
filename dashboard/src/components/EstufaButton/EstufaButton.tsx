// import React, { useState } from "react"
// import { EstufaProps } from "../../pages/EstufaView";
// import { useNavigate } from "react-router-dom";
// import EstufaImage from "./estufa.png"
// import { Paper } from "@mui/material";

// export default function EstufaButton({idEmpresa, idEstufa, diasCultivo, nome, temperatuta, umidade}: EstufaProps) {
//     //const [EstufaInfo, setEstufaInfo] = useState<EstufaProps>({diasCultivo})
//     const nav = useNavigate();
//     const useNav = () =>{
//         nav("EstufaPage", {state : {idEmpresa, idEstufa, diasCultivo, nome, temperatuta, umidade}})
//     } 
//     return (
//         <Paper elevation={2} onClick={() => console.log('teste')} style={{borderRadius:13, display: "flex", alignItems: 'center', cursor:'pointer'}}>
//             <img src={EstufaImage} height={100} width={100} style={{margin: 10}}/>
//             <p id="title">{nome}</p>
//             <div className="info">  
//                 <p>{temperatuta}</p>
//                 <p>{umidade}</p>
//                 <p>{diasCultivo}</p>
//                 <p>{}</p>
//             </div>
//         </Paper>
//     );
// };
