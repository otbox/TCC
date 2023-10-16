import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from "js-cookie";
export default function BackButton() {
    const navigate = useNavigate();
    return(
        <Button variant="outlined" style={{marginBottom: 20}} onClick={() => navigate(-1)} > <ArrowBackIcon style={{color: 'black'}}/></Button>
    )
}

export function ExitButton() {
    const navigate = useNavigate();

    const Logout = () => {
        Cookies.remove("user");
        Cookies.remove("passw");
        navigate('/');

    }
    return(
        <Button variant="text" style={{marginBottom: 20}} onClick={Logout} > <LogoutIcon style={{color: 'black', width: 40, height: 40}}/></Button>
    )
}