import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native/";
import { useAppSelector } from "./hooks";
import { SelectUser } from "../shared/Store/reducers/userReducer";

export default function Home() {

    const bb = useAppSelector(SelectUser);
    return (
        <SafeAreaView>
            <View style = {{paddingLeft : 20}}>
                <Text>User:</Text>
                <Text>{bb?.id}</Text>
                <Text>{bb?.name}</Text>
                <Text>{bb?.passwd}</Text>
            </View>
        </SafeAreaView>
    )   
};
