import { Platform } from "react-native";

export default function ApiVerify() {
    let address1 = 'http://192.168.1.106:3001/api/';
    let address2 = 'http://localhost:3001/api/';

    let address = Platform.OS !== 'web' ? address1 : address2;

    return address
};
