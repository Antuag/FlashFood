import { useEffect, useRef } from "react";
import io from "socket.io-client";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMotorcycle, FaPlay, FaStop } from "react-icons/fa";
import road from "../assets/road.png"; // ajusta la ruta si es distinta
// Arreglo del ícono roto en React
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});


const customIcon = new L.Icon({
    iconUrl: road,
    iconSize: [25, 25], // tamaño del icono
    iconAnchor: [20, 40], // punto de anclaje (centro abajo)
    popupAnchor: [0, -40], // para el popup si quieres mostrar info
    shadowUrl: markerShadow,
    shadowSize: [41, 41],
    shadowAnchor: [14, 41],
});

export default function MotoMapRealtime({ plate }) {
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const socketRef = useRef(null);
    const pathRef = useRef(null);

    const BASE_URL = "http://localhost:5000";

    useEffect(() => {
        if (!plate) return;

        // Espera a que el div #map exista en el DOM
        if (!mapRef.current && document.getElementById("map")) {
            const map = L.map("map").setView([5.05, -75.49], 16);
            mapRef.current = map;

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            const marker = L.marker([5.05, -75.49], { icon: customIcon }).addTo(map);
            marker.bindTooltip(`Placa: ${plate}`, { permanent: true, direction: "rigth" });

            markerRef.current = marker;

            const polyline = L.polyline([], { color: "red" }).addTo(map);
            pathRef.current = polyline;
        }

        socketRef.current = io(BASE_URL);

        socketRef.current.on(plate, (data) => {
            const { lat, lng } = data;
            console.log("Coordenadas recibidas: ", lat, lng )
            if (markerRef.current && mapRef.current) {
                markerRef.current.setLatLng([lat, lng]);
                mapRef.current.panTo([lat, lng]);
                if (pathRef.current) {
                    pathRef.current.addLatLng([lat, lng]);
                }
            }
        });

        return () => {
            if (socketRef.current) socketRef.current.disconnect();
            // Limpia el mapa solo si existe
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [plate]); // 👈 importante: vuelve a ejecutarse si cambia la placa

    const iniciarTracking = async () => {
        try {
            const res = await fetch(`${BASE_URL}/motorcycles/track/${plate}`, {
                method: "POST",
            });
            const json = await res.json();
            console.log("✅ Tracking iniciado:", json);
        } catch (error) {
            console.error("❌ Error al iniciar:", error);
        }
    };

    const detenerTracking = async () => {
        try {
            const res = await fetch(`${BASE_URL}/motorcycles/stop/${plate}`, {
                method: "POST",
            });
            const json = await res.json();
            console.log("🛑 Tracking detenido:", json);
        } catch (error) {
            console.error("❌ Error al detener:", error);
        }
    };



    return (
        <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-start pt-8">
            <div className="bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-2xl">
                <div className="flex items-center gap-2 mb-6">
                    <FaMotorcycle className="text-orange-400 text-2xl" />
                    <h1 className="text-2xl font-bold text-white">Seguimiento en Tiempo Real</h1>
                </div>

                <div className="flex gap-4 mb-6">
                    <button
                        onClick={iniciarTracking}
                        className="flex items-center gap-2 bg-green-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-green-700 transition"
                    >
                        <FaPlay /> Iniciar Recorrido
                    </button>
                    <button
                        onClick={detenerTracking}
                        className="flex items-center gap-2 bg-red-600 px-5 py-2 rounded-lg text-white font-semibold hover:bg-red-700 transition"
                    >
                        <FaStop /> Detener Recorrido
                    </button>

                </div>

                <div
                    id="map"
                    className="w-full h-[65vh] rounded-xl shadow-lg border border-gray-700"
                />
            </div>
        </div>
    );
}
