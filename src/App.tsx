import './App.css'
import {useEffect} from "react";
import {useStores} from "./store/StoreContext.tsx";
import {observer} from "mobx-react-lite";
import Header from "./components/header.tsx";

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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
                <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '400px', overflowY: 'auto' }}>
                    <h3>Live Feed:</h3>
                    {Array.from(mainStore.objects.values()).map(obj => (
                        <div key={obj.id} style={{ fontSize: '12px', marginBottom: '5px' }}>
                            ID: {obj.id} | Lat: {obj.lat.toFixed(4)} | Lost: {obj.isLost ? '🔴' : '🟢'}
                        </div>
                    ))}
                </div>

                {/* Сюда мы потом вставим карту */}
                <div style={{ background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Здесь будет карта Leaflet
                </div>
            </div>
        </div>
    )
})



export default App
