import './App.css'
import {useEffect} from "react";
import {useStores} from "./customHooks/useStores.ts";
import {observer} from "mobx-react-lite";
import Header from "./components/header.tsx";
import LiveFeed from "./components/liveFeed.tsx";
import Map from "./components/map.tsx";
import {Box, IconButton} from "@mui/material";
import LoginWindow from "./components/loginWindow.tsx";
import { Logout } from "@mui/icons-material";

const App = observer(() => {
    const { mainStore, authStore } = useStores()

    useEffect(() => {
        if(authStore.authStatus) {
            mainStore.connect()
        }
        return () => {
            mainStore.disconnect()
        }
    }, [authStore.authStatus, mainStore])

    if(!authStore.isAuthenticated) {
        return <LoginWindow/>
    }

    const objectsCount = mainStore.objects.size

    return (
        <Box sx={{ padding: '20px', width: "100%",  fontFamily: 'sans-serif' }}>
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 50 }}
                    onClick={() => {authStore.logout()}}
                >
                    <Logout sx={{color: 'gray', '&:hover': {
                            color: 'red',
                        }}}/>
                </IconButton>

            <Header objectsCount={objectsCount}/>
            <Box sx={{ display: 'flex' , height: '100vh', width: '100%', gap: '10px' }}>
                <Map/>
                <LiveFeed/>
            </Box>
        </Box>
    )
})



export default App
