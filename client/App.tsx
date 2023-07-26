import { Button, SafeAreaView } from "react-native";
import store from './shared/Store'
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EstufaProfile from "./pages/EstufaProfile";

const Stack = createNativeStackNavigator();

export default function App () {
  return (
    <Provider store = {store}>
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerTintColor: 'white', headerStyle: {backgroundColor: '#AFD5AA'}, animation:"default", headerLeft: undefined}}>
          <Stack.Screen name = "Login" component={Login}/>
          <Stack.Screen name = "Home" component={Home} options = {{gestureEnabled: false, headerBackVisible: false}}/>
          <Stack.Screen name = "EstufaProfile" component={EstufaProfile}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
} 