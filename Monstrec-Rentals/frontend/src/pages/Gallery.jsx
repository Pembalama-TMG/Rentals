import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useVehicles from '../hooks/useVehicles.js';
import OptimizedImage from '../components/OptimizedImage.jsx';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const { vehicles } = useVehicles();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Flatten all vehicle images
  const allGalleryItems = useMemo(() => {
    return vehicles.flatMap(vehicle => {
      const images = vehicle.images && vehicle.images.length > 0 
        ? vehicle.images 
        : [vehicle.image];
      
      return images.map((image, idx) => ({
        image,
        vehicleName: vehicle.name,
        category: vehicle.type || 'vehicles',
        vehicleId: vehicle._id,
        index: idx,
      }));
    });
  }, [vehicles]);

  // Filter by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') return allGalleryItems;
    return allGalleryItems.filter(item => item.category === selectedCategory);
  }, [allGalleryItems, selectedCategory]);

  const categories = [
    { id: 'all', label: 'All Images', count: allGalleryItems.length },
    { id: 'scooter', label: 'Scooters', count: allGalleryItems.filter(i => i.category === 'scooter').length },
    { id: 'bike', label: 'Bikes', count: allGalleryItems.filter(i => i.category === 'bike').length },
  ];

  const handlePreviousImage = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? filteredItems.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === filteredItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentFullScreenItem = filteredItems[selectedImageIndex];

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Vehicle Gallery
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore our premium collection of scooters and bikes
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(category.id);
                setSelectedImageIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
              <span className="ml-2 text-sm">({category.count})</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Masonry Gallery */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.vehicleId}-${item.index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer break-inside-avoid"
              onClick={() => setSelectedImageIndex(index)}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl">
                <OptimizedImage
                  src={item.image}
                  alt={item.vehicleName}
                  className="w-full h-auto"
                  objectFit="cover"
                  animate={true}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Info */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-semibold">{item.vehicleName}</p>
                  <p className="text-white/80 text-sm capitalize">{item.category}</p>
                </div>

                {/* Expand Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No images available in this category
            </p>
          </div>
        )}
      </div>

      {/* Full Screen Lightbox */}
      {selectedImageIndex !== null && currentFullScreenItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors z-10"
          >
            <X size={28} className="text-white" />
          </motion.button>

          {/* Navigation Buttons */}
          {filteredItems.length > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousImage();
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors z-10"
              >
                <ChevronLeft size={32} className="text-white" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-sm transition-colors z-10"
              >
                <ChevronRight size={32} className="text-white" />
              </motion.button>
            </>
          )}

          {/* Main Image */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl"
          >
            <OptimizedImage
              src={currentFullScreenItem.image}
              alt={currentFullScreenItem.vehicleName}
              className="w-full h-full"
              objectFit="contain"
            />
          </motion.div>

          {/* Image Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-sm p-4 rounded-lg text-white"
          >
            <p className="font-semibold text-lg">{currentFullScreenItem.vehicleName}</p>
            <p className="text-white/80 capitalize">{currentFullScreenItem.category}</p>
            {filteredItems.length > 1 && (
              <p className="text-white/60 text-sm mt-2">
                {selectedImageIndex + 1} of {filteredItems.length}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
