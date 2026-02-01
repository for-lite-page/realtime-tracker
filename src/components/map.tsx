import {MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import { observer } from 'mobx-react-lite';
import { useStores } from '../store/StoreContext';
import {useEffect} from "react";
import {droneIcon} from "../assets/droneIcon.ts";

const MapView = observer(() => {
    const { mainStore } = useStores();
    const drones = Array.from(mainStore.objects.values());

    return (
        <MapContainer
            center={[28.2915, -16.6291]}
            zoom={7}
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