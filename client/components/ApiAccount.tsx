import axios from "axios"
import { useState } from "react";
import { UserType } from "../shared/types/UserType";
import { useAppDispatch, useAppSelector } from "../pages/hooks";
import { setUserAction } from "../shared/Store/reducers/userReducer";

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
    const address = "https://otboxserver.000webhostapp.com/Connect.php";
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
          console.log(response.data)
          if (!response.data) {
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
            console.log(user1.ativo)
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
  