import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import { useStores } from '../store/StoreContext';
import L from 'leaflet';
import {useEffect} from "react";

const droneIcon = (direction: number, isLost: boolean) => L.divIcon({
    html: `
    <div style="transform: rotate(${direction}deg); transition: all 0.5s linear;">
       <svg xmlns="http://www.w3.org/2000/svg" fill="${isLost ? 'red' : '#1976d2'}" viewBox="0 0 384 512"><path d="M169.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L192 205.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z"/></svg>
    </div>`,
    className: 'custom-drone-icon',
});

const MapView = observer(() => {
    const { mainStore } = useStores();
    const drones = Array.from(mainStore.objects.values());

    return (
        <MapContainer
            center={[50.45, 30.52]}
            zoom={13}
            style={{ height: '100%', width: '90%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapResizer/>
            {drones.map((drone) => (
                <Marker
                    key={drone.id}
                    position={[drone.lat, drone.lng]}
                    icon={droneIcon(drone.direction, drone.isLost)}
                >
                    <Popup>
                        ID: {drone.id} <br />
                        Status: {drone.isLost ? 'LOST' : 'ACTIVE'}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
});

export default MapView;


const MapResizer = () => {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100);
    }, [map]);

    return null;
};