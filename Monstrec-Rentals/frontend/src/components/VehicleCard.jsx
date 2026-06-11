import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';

export default function VehicleCard({ vehicle }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-200">
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
          {vehicle.type.toUpperCase()}
        </div>
        {vehicle.availability && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-dark mb-2">{vehicle.name}</h3>
        <p className="text-gray-600 text-sm mb-3">{vehicle.brand} {vehicle.model} • {vehicle.year}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={12} />
            ))}
          </div>
          <span className="text-sm text-gray-600">({vehicle.rating})</span>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="bg-light p-2 rounded">
            <p className="text-gray-600">Per KM</p>
            <p className="font-bold flex items-center gap-1">
              <FaRupeeSign size={12} /> {vehicle.pricePerKm}
            </p>
          </div>
          <div className="bg-light p-2 rounded">
            <p className="text-gray-600">Per Day</p>
            <p className="font-bold flex items-center gap-1">
              <FaRupeeSign size={12} /> {vehicle.dailyRate}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/vehicle/${vehicle._id}`}
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition font-semibold text-center block"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
