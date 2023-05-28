import axios from "axios"

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

export const isLoginAccount = async (props: ApiProps): Promise<boolean> => {
    const { address, name, passwd } = props;
  
    return new Promise<boolean>((resolve, reject) => {
      axios
        .post("http://localhost:3001/api/SelectRegister", {
          name,
          passwd,
        })
        .then((response) => {
          if (!response.data) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
        .catch((error) => {
          console.error(error);
          resolve(false);
        });
    });
  };
  