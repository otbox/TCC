import {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TextStyle } from 'react-native';
import { useFonts } from 'expo-font';

interface TextProps {
    children?: string;
    style?: TextStyle;
    fontWeight?: number;
}

const InitialValue : TextProps = {
    fontWeight: 0,
} as TextProps


const Text1: React.FC<TextProps> = ({ children, style, fontWeight }) => {
    
    let [fontsLoaded] = useFonts({
        Roboto11: require('../assets/fonts/RobotoSlab-Regular.ttf'),  
        Roboto1: require('../assets/fonts/RobotoSlab-Thin.ttf'),  
        Roboto2: require('../assets/fonts/RobotoSlab-Regular.ttf')
        });

    if (!fontsLoaded) {
        return <View />;
    }

    

    return (
        <Text style={[style , fontWeight === 0 ? styles.text : styles.text1]}>
            {children}
        </Text>
    );
};

export default Text1;

const styles = StyleSheet.create({
    text: {
        fontFamily:  "Roboto11",
    },
    text1: {
        fontFamily:  "Roboto1",
    },
    text2: {
        fontFamily:  "Roboto2",
    }
});
