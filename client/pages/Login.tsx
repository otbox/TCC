import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View} from 'react-native';
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
        <View style= {{marginTop:40, height: 300, width: '100%',justifyContent:'space-between', alignItems:'center'}}>
          <View style= {{marginTop:40, height: 300, width: '100%',justifyContent:'space-between', alignItems:'center'}}>
          <TextInput
            style={{height: 40,
              width: "70%",
              borderWidth: 1,}}
            placeholder="Nome"
            keyboardType="ascii-capable"
            onChangeText={(e) =>SetName(e)}
          />
          <TextInput
          style={{height: 40,
            width: "70%",
            borderWidth: 1,}}
          placeholder="Senha"
          keyboardType="ascii-capable"
          onChangeText={(e) => SetSenha(e)}
        />
        </View>
        <Text style = {{marginVertical: 10}}>{Erros}</Text>
        <Checkbox onChange={SetSave} changed={Save} texto='Lembrar'/> 
        <Button2 height={110} width={110} label={"Criar"} onClick={() => CreateAccount({address: ApiVerify(), name:Name, passwd:Senha})}/>
        <Button2 height={110} width={110} label={"Entrar"} onClick={() => Logando()}/>
        <Button2 height={110} width={110} label={"Entrar"} onClick={() => GetLogin()}/>
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
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
