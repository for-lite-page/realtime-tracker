import './App.css'
import {useEffect} from "react";
import {useStores} from "./store/StoreContext.tsx";
import {observer} from "mobx-react-lite";
import Header from "./components/header.tsx";
import LiveFeed from "./components/liveFeed.tsx";
import Map from "./components/map.tsx";
import {Box} from "@mui/material";

const App = observer(() => {
    const { mainStore } = useStores()

    useEffect(() => {
        mainStore.connect()

        return () => {
            mainStore.disconnect()
        };
    }, [mainStore])

    const objectsCount = mainStore.objects.size

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <Header objectsCount={objectsCount}/>

            <Box sx={{ display: 'flex', height: '100vh', width: '90vw', gap: '10px' }}>
                <LiveFeed/>
                <Map></Map>
            </Box>
        </div>
    )
})



export default App
