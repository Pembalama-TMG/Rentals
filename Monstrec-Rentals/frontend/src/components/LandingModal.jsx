import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bike, Users } from 'lucide-react';

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
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20 }}
            className="w-full max-w-2xl"
          >
            {/* Main Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-primary to-accent p-8 text-white text-center">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    Welcome to Monstrec Rentals
                  </h1>
                  <p className="text-lg opacity-90">
                    Choose how you would like to use our platform
                  </p>
                </motion.div>
              </div>

              {/* Options */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Customer Option */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                    onClick={handleCustomer}
                  >
                    <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 group-hover:shadow-lg">
                      <motion.div
                        className="mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Bike className="w-16 h-16 text-blue-600 dark:text-blue-400 mx-auto" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
                        Rent a Vehicle
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                        I want to rent a scooter or bike for my travel.
                      </p>
                      <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:shadow-lg">
                        Rent Now
                      </button>
                    </div>
                  </motion.div>

                  {/* Owner Option */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    className="group cursor-pointer"
                    onClick={handleOwner}
                  >
                    <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 hover:border-green-400 dark:hover:border-green-500 transition-all duration-300 group-hover:shadow-lg">
                      <motion.div
                        className="mb-4"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Users className="w-16 h-16 text-green-600 dark:text-green-400 mx-auto" />
                      </motion.div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-3">
                        Become a Vehicle Partner
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 text-center mb-6">
                        I want to list my scooter or bike and earn money.
                      </p>
                      <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform group-hover:shadow-lg">
                        List My Vehicle
                      </button>
                    </div>
                  </motion.div>
                </div>

                {/* Close Option */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={handleClose}
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 font-semibold transition-colors"
                  >
                    Skip for now →
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LandingModal;
