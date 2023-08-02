import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

type PaperProps = {
    children? : ReactNode,
    style?: ViewStyle,
}

export default function Paper({children, style} : PaperProps) {
    return(
        <View style = {[style1.paper, style]}> 
            {children}
        </View>
    )
};

const style1 = StyleSheet.create({
    paper: {
        backgroundColor:'white',
        shadowColor: 'black',
        //shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        borderRadius: 10,
        margin: 10,
        elevation: 2,
    }
})
