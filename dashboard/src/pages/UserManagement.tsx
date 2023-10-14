//  import {
//     Autocomplete,
//     Button,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
//     TextField,
//   } from "@mui/material";
//   import { useEffect, useState } from "react";
//   import { PostToPHP } from "../components/Api";
  
//   export default function UserManagement() {
//     const [users, setUsers] = useState<string[][] | undefined>();
//     const [ativo, setAtivo] = useState();
//     useEffect(() => {
//       PostToPHP({ Operation: "selectUsers", Content: { idEmpresa: "1" } }).then(
//         (result) => {
//           console.log(result);
//           setUsers(result);
//           result.map((value) => {
//             console.log("valor" + value[3]);
//           });
//         }
//       );
//     }, []);
  
//     let options : object[] = [];
//     if (users) {
//       options = users.map((value) => {
//         return {
//           firstLetter: value[3].substring(0, 1).toUpperCase(),
//           name: value[3],
//           ativo: value[5],
//           nivel: value[2]
//         };
//       });
//     }
//     var abbb;
//     return (
//       <>
//         <FormControl
//           fullWidth
//           sx={{
//             marginTop: 10,
//           }}
//         >
//           <Autocomplete
//             options={options.sort(
//               (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
//             )}
//             groupBy={(option) => option.firstLetter}
//             getOptionLabel={(option) => option.name}
//             isOptionEqualToValue={(option, value) => {option.name === value.name ? console.log('igual') : '';} }
//             renderInput={(params) => <TextField {...params} label="Usuários" />}
//           />
//         </FormControl>
  
//         <FormControl
//           sx={{
//             width: 120,
//           }}
//         >
//           <InputLabel id="demo-simple-select-label">Age</InputLabel>
//           <Select
//             labelId="demo-simple-select-label"
//             id="demo-simple-select"
//             label="Age"
//             value={ativo}
//             onChange={(e) => {setAtivo(e.target.value)}}
//           >
//             <MenuItem value={1}>Sim</MenuItem>
//             <MenuItem value={0}>Não</MenuItem>
//           </Select>
//         </FormControl>
//         <Button variant="contained" onClick={() => {console.log(options)}}> Criar</Button>
//         <Button variant="contained" onClick={() => {console.log(users)}}> Remover</Button>
//         <Button variant="contained"> Alterar</Button>
//       </>
//     );
//   }
  


  import {
        Autocomplete,
        Button,
        FormControl,
        InputLabel,
        MenuItem,
        Select,
        TextField,
      } from "@mui/material";
      import { useEffect, useRef, useState } from "react";
      import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
      import { PostToPHP } from "../components/Api";
import UserInterface from "../components/userInterface";
import { useLocation } from "react-router-dom";
import { ErrorAlertC} from "../components/Alerts";

      export default function UserManagement() {
        const [users, setUsers] = useState<string[][] | undefined>();
        const [ativo, setAtivo] = useState<string>();
        const [textoUser, setTextoUser] = useState<UserInterface | null>(); //Nome do Usuario que foi digitado
        const [inputValue, setInputValue] = useState<string | undefined>(''); //é a opção selecionada do autocomplete
        const [nivel, setNivel] = useState<string>();
        const [senha, setSenha] = useState<string>();
        const [idUsuario, setIdUsuario] = useState<string>(); 
        const [textError, setTextError] = useState<"error" | "primary" | "secondary" | "info" | "success" | "warning">("primary");
        const [nomeUser, setNomeUser] = useState<string | null>();
        const {state} = useLocation();
        const {params} = state;
        const idEmpresaGlobal = params;
        const [ErrorAlert, setErrorAlert] = useState<{text: string, tipo: "error" | "success"}[]>([]);
        
        const autoC = useRef<HTMLElement | null>(null);

        //Inicializador da Página
        useEffect(() => {
          SelectUsers()
        }, []);


        //Formador de Arrays com os Alertas
        const handleShowAlertError = (alertText : string, TipoAlert: "error" | "success") => {
          setErrorAlert(prevAlerts => [...prevAlerts, {text: alertText, tipo: TipoAlert}]);
        }

        const SelectUsers = () => {
          PostToPHP({ Operation: "selectUsers", Content: { idEmpresa: idEmpresaGlobal } }).then(
            (result : any) => {
              setUsers(result);
            }
            ).catch((err) => {console.log(err)});
            
        }
        const AddUser = () => {
          if(textError != 'error'){
            if(nomeUser == undefined){handleShowAlertError("Usuário já existente, não é possível adicionar", 'error'); return;}
            PostToPHP({Operation: "addUser", Content: {
              idEmpresa: idEmpresaGlobal,
              nome: nomeUser,
              ativo: ativo,
              nivel: nivel,
              passw: senha,
            }})
            .then((result) => {console.log(result);SelectUsers(); handleShowAlertError("Sucesso na Inclusão :)","success"); CleanFields();})
            .catch(() =>{handleShowAlertError("Erro de Servidor", 'error');})
          }else{
            handleShowAlertError("Erro de Campo, por favor preencha corretamente", "error");
          }
        }

        const AlterUser = () => {
          console.log(inputValue)
          if(textError != 'error' && inputValue != undefined){
          PostToPHP({Operation:"alterUser", Content: {
            idUsuario,
            ativo,
            nome: inputValue,
            nivel,
            passw: senha, 
          }})
          .then((res) => {console.log(res);SelectUsers(); handleShowAlertError("Alterado com Sucesso", 'success');})
          .catch(() => {handleShowAlertError("Erro de Servidor", 'error')})
          }else{
            handleShowAlertError("Erro de Campo", 'error');
          }
        }

        const RemoveUser = () => {
          PostToPHP({Operation: "deleteUser", Content: {
            idUsuario,
          }}).then((result) => {console.log(result); SelectUsers(); handleShowAlertError('Sucesso na Remoção', 'success');})
          CleanFields();
        }
        
        const CleanFields = () => {
          setAtivo(undefined);
          setSenha(undefined);
          setNivel(undefined);
          setTextoUser(null);
          setInputValue(undefined);
          setNomeUser(undefined);
          if(autoC.current){
          const ele = autoC.current.getElementsByClassName('MuiAutocomplete-clearIndicator')[0] as HTMLElement;
          if (ele) ele.click();
          }
        }


        useEffect(() => {console.log(textoUser)},[textoUser])
        //Configurações do AutoComplete 
        const TextUserHandler = () => {
          setNomeUser(textoUser?.name);
        }
        let options : UserInterface[] = [];
        if (users) {
          options = users.map((value) => {
            return {
              firstLetter : value[3].substring(0, 1).toUpperCase(),
              passw: value[4],
              name: value[3],
              ativo: value[5],
              nivel: value[2],
              idEmpresa: value[1],
              idUsuario: value[0],
            };
          });
        }
        
        //Select Ativo handler
        const AtivoHandler = (objeto: UserInterface) => {
          setAtivo(objeto.ativo)
        }

        
        return (  
          <>
            <h1>Gerenciar Usuários</h1>
            <div>
              <div id="notifysdiv">
              {ErrorAlert.map((alert, index) => (
                <ErrorAlertC key={index} text={alert.text} tipo={alert.tipo}/>
              ))}
              </div>
            </div>
            
            <FormControl
              fullWidth
              sx={{marginTop: 10}}
              variant="standard"
            >
              <Autocomplete
                ref={autoC}
                options={options.sort(
                  (a, b) => {
                    const firstValue = a.firstLetter || "";
                    const secondValue = b.firstLetter || "";
                    return -secondValue.localeCompare(firstValue);
                  }
                )}
                groupBy={(option: UserInterface) => option.firstLetter || ''}
                getOptionLabel={(option: UserInterface) => option.name || ''} 
                noOptionsText= {textError == 'error' ? <p>Erro: Máximo de caracteres é 100</p> :
                <Button variant="text" onClick={TextUserHandler} style={{color: 'gray', fontWeight: "normal",textTransform:"inherit"}}> 
                  <AddCircleOutlineIcon style={{marginRight: 10}}/>Não encontrado deseja adicionar?
                </Button>
                }
                //value={textoUser} 
                
                inputValue={inputValue}
                isOptionEqualToValue={(option, value) => option.name === value.name}
                onChange={(_event, value) => {
                  if(value && value.name){
                    AtivoHandler(value)
                    setNivel(value.nivel)
                    setSenha(value.passw)
                    setIdUsuario(value.idUsuario)
                  }
                }}
                onInputChange={(_event, newValue) =>{
                  newValue.length >= 100 ? setTextError('error') : setTextError('primary') 
                  setTextoUser(prev => ({ ...prev, name: newValue } as UserInterface))
                  setInputValue(newValue)
                }}
                renderInput={(params) => <TextField helperText={nomeUser != undefined ? 'Nome do novo usuário: ' + nomeUser : ''} color={textError} {...params} label="Usuários" />}
                
              />
            </FormControl>

            <TextField 
              style={{width: 400}} 
              variant="outlined" 
              label='Senha' 
              value={senha || ''}
              color={textError} 
              helperText = {textError == 'error' ? 'Máximo de Caracteres: 100' :''}
              onChange={(e) => {e.target.value.length > 100 ? setTextError('error') : setTextError("primary"); setSenha(e.target.value)}}
            />
            
            <br />
            <FormControl
              sx={{
                width: 200,
              }}
            >
              <InputLabel id="demo-simple-select-label">Nível</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={nivel || ''}
                onChange={(e) => {setNivel(e.target.value as string)}}
              >
                <MenuItem value={"1"}>Administrador</MenuItem>
                <MenuItem value={"0"}>Usuário</MenuItem>
              </Select>
            </FormControl>    
            <FormControl
              sx={{
                width: 120,
              }}
            >
              <InputLabel id="demo-simple-select-label">Ativo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Ativo"
                value={ativo || ''}
                onChange={(e) => {setAtivo(e.target.value as string)}}
              >
                <MenuItem value={"1"}>Sim</MenuItem>
                <MenuItem value={"0"}>Não</MenuItem>
              </Select>
            </FormControl>
            <br />
            <Button variant="contained" onClick={AddUser}> Criar</Button>
            <Button variant="contained" onClick={RemoveUser}> Remover</Button>
            <Button variant="contained" onClick={AlterUser}> Alterar</Button>
            <Button variant="contained" onClick={CleanFields}> Clear</Button>
          </>
        );
      }
      