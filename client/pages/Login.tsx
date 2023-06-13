import { StatusBar } from 'expo-status-bar';
import { Button, Platform, SafeAreaView } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button2 } from '../components/Button2';
import { CreateAccount, isLoginAccount } from '../components/ApiAccount';
import { useAppDispatch, useAppSelector } from './hooks';
import { counterSlice, decrement, increment, incrementByAmount, selectCount } from '../shared/Store/reducers/globalReducer';
import userReducer, { SelectUser, setUserAction } from '../shared/Store/reducers/userReducer';
import { UserType } from '../shared/types/UserType';


export default function Login({navigation}) {
  const [Name, SetName] = useState<string>("");
  const [Senha, SetSenha] = useState<string>("");
  const [Logged, SetLogged] = useState<boolean>()

  let address1 = 'http://192.168.1.106:3001/api/';
  let address2 = 'http://localhost:3001/api/'

  let address = Platform.OS !== 'web' ? address1 : address2;
  const dispatch = useAppDispatch();
  const Receive = () => {
    console.log(axios.get('http://localhost:3001/api/GetRegisters'))
  }
  
  const Logando = () => {
    isLoginAccount({address: address, name:Name, passwd:Senha}).then((result) => {
      dispatch(setUserAction(result));
      navigation.navigate('Home');
    }).catch(() => console.log("não encontrado"));
  }
  
  const bb = useAppSelector(SelectUser);
  var c = 0;
  useEffect(() => {
    console.log(bb)
  },[bb])


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
        <Text style = {{marginVertical: 10}}>{Logged == false ? 'Usuário ou Senha errados' : Logged === true ? 'Entrou' : null}</Text>
        <Button2 height={110} width={110} label={"Criar"} onClick={() => CreateAccount({address: address, name:Name, passwd:Senha})}/>
        <Button2 height={110} width={110} label={"Entrar"} onClick={() => Logando()}/>
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: '#fff',
    alignItems:'center',
  },
  header: {
    backgroundColor: '#40E0D0',
    height: 80,
    width: "100%",
    justifyContent:'center',
  },
  button: {
    color:'##7FFFD4',
    width: 100,
    height: 100,
  }
});

//#90EE90
//#00FA9A
//#7FFFD4
//#40E0D0
