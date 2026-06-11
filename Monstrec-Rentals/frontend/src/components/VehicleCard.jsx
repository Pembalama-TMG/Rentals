import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage.jsx';

export default function VehicleCard({ vehicle }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get images from vehicle - handle both single image and gallery
  const images = vehicle.images && vehicle.images.length > 0 
    ? vehicle.images 
    : [vehicle.image || 'https://via.placeholder.com/400x300'];

  const currentImage = images[currentImageIndex];

  const handlePreviousImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.preventDefault();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      {/* Image Gallery */}
      <div className="relative overflow-hidden h-56 bg-gray-200 dark:bg-gray-700 group">
        <OptimizedImage
          src={currentImage}
          alt={vehicle.name}
          className="h-full w-full"
          objectFit="cover"
          animate={true}
        />
        
        {/* Image Navigation - Show only if multiple images */}
        {images.length > 1 && (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePreviousImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={20} className="text-gray-900 dark:text-white" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={20} className="text-gray-900 dark:text-white" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {currentImageIndex + 1}/{images.length}
            </div>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
          {vehicle.type?.toUpperCase() || 'VEHICLE'}
        </div>
        {vehicle.availability && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Available
          </div>
        )}

        {/* Image Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentImageIndex(idx);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{vehicle.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {vehicle.brand} {vehicle.model} • {vehicle.year}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} size={14} />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({vehicle.rating || 5})
          </span>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-2 mb-5 text-sm">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-xs">Per KM</p>
            <p className="font-bold text-gray-900 dark:text-white">₨ {vehicle.pricePerKm || 20}</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
            <p className="text-gray-600 dark:text-gray-400 text-xs">Per Day</p>
            <p className="font-bold text-gray-900 dark:text-white">₨ {vehicle.dailyRate || 500}</p>
          </div>
        </div>

        {/* CTA */}
        <Link
          to={`/vehicle/${vehicle._id}`}
          className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white py-3 rounded-lg transition-all font-semibold text-center block transform hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
