import { Button, View } from "react-native"

interface ButtonProps {
    onClick?: () => void;
    width?: number;
    height?: number;
    label?: any;
}

export const Button2 = (props: ButtonProps) => {
    const { width, height, label, onClick} = props;

    return (
        <View style = {{width:width, height:height}}>
            <Button color='#90EE90' title={label} onPress={onClick}/>
        </View>
    )
}