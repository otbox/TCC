import { SafeAreaView } from "react-native";
import store from './shared/Store'
import Login from "./pages/Login";
import { Provider } from "react-redux";

export default function App () {
  return (
    <Provider store = {store}>
        <Login />
    </Provider>
  )
} 