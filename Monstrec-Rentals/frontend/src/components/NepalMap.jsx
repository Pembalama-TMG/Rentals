import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from 'framer-motion';

const NepalMap = () => {
  const cities = [
    { name: 'Kathmandu', lat: 27.7172, lng: 85.3240, vehicles: 45 },
    { name: 'Pokhara', lat: 28.2096, lng: 83.9856, vehicles: 28 },
    { name: 'Lalitpur', lat: 27.6868, lng: 85.3161, vehicles: 15 },
    { name: 'Bhaktapur', lat: 27.6717, lng: 85.4293, vehicles: 12 },
    { name: 'Chitwan', lat: 27.5514, lng: 84.8262, vehicles: 20 },
    { name: 'Butwal', lat: 27.8087, lng: 83.4765, vehicles: 10 },
  ];

  const customIcon = new Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full rounded-2xl shadow-2xl overflow-hidden"
    >
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer
          center={[27.7172, 85.3240]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          className="rounded-2xl"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {cities.map((city, index) => (
            <Marker
              key={index}
              position={[city.lat, city.lng]}
              icon={customIcon}
            >
              <Popup>
                <div className="text-center">
                  <h3 className="font-bold text-lg">{city.name}</h3>
                  <p className="text-sm text-gray-600">{city.vehicles} Vehicles Available</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Cities List */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-6 bg-white dark:bg-gray-800">
        {cities.map((city, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-primary hover:text-white transition-colors cursor-pointer"
          >
            <h4 className="font-bold mb-2">{city.name}</h4>
            <p className="text-sm opacity-80">{city.vehicles} Vehicles</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default NepalMap;
