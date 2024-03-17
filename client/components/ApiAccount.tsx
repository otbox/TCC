import axios from "axios"
import { useState } from "react";
import { UserType } from "../shared/types/UserType";
import { useAppDispatch, useAppSelector } from "../pages/hooks";
import { setUserAction } from "../shared/Store/reducers/userReducer";

//Sistema de comunicação entre banco atraves do post com o app 

interface ApiProps {
    id?: number;
    name?: string; 
    passwd?: string; 
    address: string;
}

export const ReceiveAccounts = async (props : ApiProps) => {
    return await axios.get(props.address + "getRegisters");
}

export const CreateAccount  = async (props: ApiProps) => {
    const {address, name, passwd} = props;
    
    await axios.post(address + "InsertRegister", {
        name,
        passwd,
    })
}

export const RemoveAccount = async (props: ApiProps) => {
    const {id, address} = props;

    await axios.post(address + "DeleteRegisters", {
        id: id,    
    }).then((response) =>
        console.log("Sucessfully Remove" + response)
    )
}

export const isLoginAccount = (props: ApiProps): Promise<UserType> => {
    const { name, passwd } = props;
    const address = "https://otbox.serv00.net/Estufa/public_html/Connect.php";
    console.log(address)
    return new Promise<UserType>((resolve, reject) => {
      axios
        .post(address, {
          Operation: "VerifyAccount",
          Content :{
          user : name,
          passw : passwd,
          }
        })
        .then((response) => {
          if (response.data == 0) {
            reject(-1);
          } else {
            const user1: UserType = {
              id: response.data[0][0],
              name: response.data[0][3],
              nivel: response.data[0][2],
              senha: response.data[0][4],
              ativo: response.data[0][5],
              idEmpresa: response.data[0][1],
            };
            if(user1.ativo == 0){reject(-2)}
            resolve(user1);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(-3);
        });
    });
  };
  
