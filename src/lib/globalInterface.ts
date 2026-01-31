
export interface Drone {
    id: string;
    lat: number;
    lng: number;
    direction: number;
    lastSeen: number;
    isLost: boolean;
}