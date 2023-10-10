import { createTheme, responsiveFontSizes } from "@mui/material";
import { green, red } from "@mui/material/colors";

const theme = createTheme(
    {
        palette:{
            primary:{
                main: green[200]
            },
            error:{
                main: red[500]
            }
        },
        components: {
            MuiTextField: {
                styleOverrides:{
                    root: {
                        marginBottom: 10
                    }
                }
            },
            MuiButton: {
                styleOverrides:{
                    root: {
                        color: 'white',
                        fontWeight: 'bold'
                    }
                }
            },
            MuiSelect: {
                styleOverrides: {
                    root: {
                        marginRight: 10
                    }
                }
            }
        }
    }
)

export default responsiveFontSizes(theme)