// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';

import { Snackbar } from "@mui/material";

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

function App() {
    return (
        <>
            <ThemeProvider>
                <ThemeSettings>
                    {" "}
                    <Router />{" "}
                </ThemeSettings>
            </ThemeProvider>

            <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={open} autoHideDuration={4000} key={horizontal + vertical} onClose={()=>{}}></Snackbar>
        </>
    );
}

export default App;
