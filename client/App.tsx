import { SafeAreaView } from "react-native";
import store from './shared/Store'
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App () {
  return (
    <Provider store = {store}>
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerTintColor: 'white', headerStyle: {backgroundColor: '#40E0D0'}, animation:"default"}}>
          <Stack.Screen name = "Login" component={Login}/>
          <Stack.Screen name = "Home" component={Home}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
} 