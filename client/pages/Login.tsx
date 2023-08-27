import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View} from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button2 } from '../components/Button2';
import { CreateAccount, isLoginAccount } from '../components/ApiAccount';
import { useAppDispatch, useAppSelector } from './hooks';
import { SelectUser, setUserAction } from '../shared/Store/reducers/userReducer';
import ApiVerify from '../components/ApiVerify';
import { useNavigation } from '@react-navigation/native';
import Checkbox from '../components/Checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInput2 from '../components/TextInput2';
import Text1 from '../components/Text';

export default function Login() {
  const navigation = useNavigation();
  const [Name, SetName] = useState<string>("");
  const [Senha, SetSenha] = useState<string>("");
  const [Erros, SetErros] = useState<string>("");
  const [Save, SetSave] = useState<boolean>(false);
  const [LoadedData, SetLoadedData] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if(LoadedData){
      Logando()
    }else{
    GetLogin();
  }
},[LoadedData])

useEffect(() => {
  console.log(Senha)
},[Senha])
  useEffect(() => {
   if(LoadedData){
      SetName("");
      SetSenha("");

   } 
  }, [navigation])
  const Savelogin = async (Name : string, Senha: string) => {
    if (Save){
      try {
        let obj = {
          passw: Senha,
          username: Name
        };
        const jsonValue = JSON.stringify(obj)
        await AsyncStorage.setItem('key', jsonValue);
        console.log("Salvo Com sucesso");
      } catch (e) {console.log(e)}
    }
  }

const GetLogin = async () => {
  try{
    const value = await AsyncStorage.getItem('key');
    if (value !== null){
      const obj = JSON.parse(value)
      SetSenha(obj.passw);
      SetName(obj.username);
      SetLoadedData(true);
    }
  }catch (e) {console.log(e)}
}
  const Logando = () => {
    console.log(Name, Senha)
    isLoginAccount({address: ApiVerify(), name:Name, passwd:Senha}).then((result) => {
      Savelogin(Name, Senha);
      dispatch(setUserAction(result));
      navigation.navigate('Home');
      console.log(result)
    }).catch((err) => {
      console.log(err);
      if (err === -1){
        SetErros("Usuario ou Senhas incorretos")
      }
      else if (err === -2){
        SetErros("Usuario Inativo")
      }
      else{
        SetErros("Erro com servidor")
      }
    });
  }
  
  return (
    <View style={styles.container}>
        <View style= {{marginTop:40, height: '100%', width: '100%',justifyContent:'space-around', alignItems:'center'}}>
            <TextInput2 icon='person-outline' onChange1={SetName} placeholder='Usuário'></TextInput2>
            <TextInput2 icon='key-outline' onChange1={SetSenha} placeholder='Senha'></TextInput2>
          <Text1 style = {{marginVertical: 10}}>{Erros}</Text1>
          <Checkbox onChange={SetSave} changed={Save} texto='Lembrar'/> 
          {/* <Button2 height={110} width={110} label={"Criar"} onClick={() => CreateAccount({address: ApiVerify(), name:Name, passwd:Senha})}/> */}
          <Button2 height={110} width={110} label={"Entrar"} onClick={() => Logando()}/>
        </View>
        <Text1 style = {{color: 'gray'}}>By Otbox</Text1>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",
    alignItems:'center',
  },
  header: {
    backgroundColor: '#40E0D0',
    height: 80,
    width: "100%",
    justifyContent:'center',
  },
  button: {
    color:'#7FFFD4',
    width: 100,
    height: 100,
  }
});

//#90EE90
//#00FA9A
//#7FFFD4
//#40E0D0
