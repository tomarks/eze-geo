import 'leaflet/dist/leaflet.css';
import { GeoJSON, GeoJSONProps, MapContainer, TileLayer } from 'react-leaflet';

type Props = { data: GeoJSONProps };

export const MapViewer = (props: Props) => {
  return (
    <div>
      <MapContainer style={{ height: '800px', width: '100%' }} center={[-20, 150]} zoom={6} scrollWheelZoom={false}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <GeoJSON data={props.data.data}></GeoJSON>
      </MapContainer>
    </div>
  );
};
