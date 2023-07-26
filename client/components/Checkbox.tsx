import { MaterialIcons } from '@expo/vector-icons';
import { useState} from "react"
import { TouchableOpacity , Text, View } from 'react-native';

type checkboxProps = {
    onChange: React.Dispatch<React.SetStateAction<boolean>>,
    changed: boolean,
    texto?: string,
}

export default function Checkbox({changed, texto , onChange} : checkboxProps) {
    const changedHandler = () => {
        onChange((prevChanged) => !prevChanged)
    }

    return(
        <TouchableOpacity onPress={changedHandler} style= {{flexDirection: 'row'}}>
            {changed ?  
            (<MaterialIcons name="check-box" size={24} color="black" />)
            :
            (<MaterialIcons name="check-box-outline-blank" size={24} color="black" />)   
        }   
        <Text style = {{alignSelf: 'center'}}>{texto}</Text> 
        </TouchableOpacity>
    )
};                                                                                                                      
