import { StyleSheet, Text, TextInput, View } from "react-native";


interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange1 : React.Dispatch<React.SetStateAction<string>>
  }

    const TextInput2 : React.FC<TextInputProps> = (props)  => {
        const {placeholder, onChange1} = props     
    return (
        <TextInput 
            style = {styleInput.input} 
            cursorColor={'#AFD5AA'}
            // placeholderTextColor={'#90EE90'}
            placeholder={placeholder}
            onChangeText = {(e) => onChange1(e)}
        />
    );
};
export default TextInput2;

const styleInput = StyleSheet.create({
    input : {
        height: 40,
        width: "70%",
        borderWidth: 2,
        borderColor: '#90EE90',
        borderRadius: 10,
        padding: 10,
        backgroundColor:'white',
        color: 'gray',
        elevation: 4,
    }
})