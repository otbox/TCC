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
    const { address, name, passwd } = props;
    return new Promise<UserType>((resolve, reject) => {
      axios
        .post(address + "SelectRegister", {
          name,
          passwd,
        })
        .then((response) => {
          if (!response.data) {
            reject(-1);
          } else {
            const user1: UserType = {
              id: response.data[0].id,
              name: response.data[0].Nome,
              passwd: response.data[0].Passw,
            };
            resolve(user1);
          }
        })
        .catch((error) => {
          console.error(error);
          reject(-1);
        });
    });
  };
  