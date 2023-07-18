import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import Paper from "./Paper";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";

type UltimaAtt = {
    UltimaData: Date,
    navigation: any,
    OnClick: () => void,
}



export default function UltAttNoti({UltimaData, navigation, OnClick} : UltimaAtt) {
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <TouchableOpacity onPress={OnClick}>
                <Ionicons name="reload-outline" size={24} color="white"/>
            </TouchableOpacity>
            ),
        })
    },[navigation])

    return (
        <Paper  style={{justifyContent: "space-between", padding: 5, flexDirection: "row"}}>
            <Text style = {{fontWeight: "bold"}}>Ultima Atualização</Text>
            <Text>{UltimaData.toLocaleTimeString()}</Text>
        </Paper>
    )
};

