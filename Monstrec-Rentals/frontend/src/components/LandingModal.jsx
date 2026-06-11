import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OptimizedImage from './OptimizedImage.jsx';
import { DEFAULT_IMAGES } from '../config/imagekit.js';

const LandingModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasVisited = localStorage.getItem('monstrec_visited');
    const userRole = localStorage.getItem('userRole');
    
    // Show modal only if user hasn't visited and isn't logged in
    if (!hasVisited && !userRole) {
      setShowModal(true);
    }
  }, []);

  const handleClose = () => {
    setShowModal(false);
    localStorage.setItem('monstrec_visited', 'true');
  };

  const handleCustomer = () => {
    localStorage.setItem('monstrec_visited', 'true');
    handleClose();
    navigate('/vehicles');
  };

  const handleOwner = () => {
    localStorage.setItem('monstrec_visited', 'true');
    handleClose();
    navigate('/owner/register');
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClose}
                className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors shadow-lg"
              >
                <svg className="w-6 h-6 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            {/* Main Container */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary via-accent to-primary p-8 md:p-12 text-white text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    Welcome to Monstrec Rentals
                  </h1>
                  <p className="text-lg opacity-90">
                    Choose your path to adventure
                  </p>
                </motion.div>
              </div>

              {/* Image Cards */}
              <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
                {/* Rent a Vehicle Card */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={handleCustomer}
                >
                  <div className="relative h-96 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {/* Image */}
                    <OptimizedImage
                      src={DEFAULT_IMAGES.landingRent}
                      alt="Rent a Vehicle"
                      className="h-full w-full"
                      objectFit="cover"
                      animate={true}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 group-hover:to-black/70 transition-colors duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h2 className="text-3xl font-bold text-white mb-2">
                          I Want to Rent
                        </h2>
                        <p className="text-white/90 text-lg mb-4">
                          Explore amazing scooters and bikes across Nepal
                        </p>
                        <div className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                          Rent Now →
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Become a Partner Card */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  onClick={handleOwner}
                >
                  <div className="relative h-96 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {/* Image */}
                    <OptimizedImage
                      src={DEFAULT_IMAGES.landingPartner}
                      alt="Become a Partner"
                      className="h-full w-full"
                      objectFit="cover"
                      animate={true}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 group-hover:to-black/70 transition-colors duration-300" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h2 className="text-3xl font-bold text-white mb-2">
                          I Want to Earn
                        </h2>
                        <p className="text-white/90 text-lg mb-4">
                          Become a Monstrec partner and earn passive income
                        </p>
                        <div className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform group-hover:scale-105">
                          Become a Partner →
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="px-6 md:px-8 pb-6 md:pb-8 text-center border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={handleClose}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors mt-4"
                >
                  Skip for now →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingModal;
