import { StatusBar } from 'expo-status-bar';
import { Button, Platform, SafeAreaView } from 'react-native';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button1 from './components/Button1';
import { Button2 } from './components/Button2';
import axios from 'axios';
import { useState } from 'react';

export default function App() {
  const [Name, SetName] = useState("");
  const [Senha, SetSenha] = useState("");

  let address1 = 'http://10.16.66.19:3001/api/';
  let address2 = 'http://localhost:3001/api/'

  let address = Platform.OS !== 'web' ? address1 : address2 
  
  const  CreateAccount = () => {
    axios.post(address + 'InsertRegister', {
      name: Name, 
      passw: Senha,
    }).then((response) =>
      console.log(response)
    ) 
  }
  

  const Receive = () => {
    console.log(axios.get('http://localhost:3001/api/GetRegisters'))
  }

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={{color:'white',fontWeight:'bold', fontSize: 24}}>Biologia Pica</Text>
        </View>
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
        <Button2 height={110} width={110} label={"Criar"} onClick={CreateAccount}/>
        </View>
        <StatusBar style="auto" />
    </SafeAreaView>
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
