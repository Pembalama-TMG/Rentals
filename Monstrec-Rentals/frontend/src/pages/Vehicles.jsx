import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VehicleCard from '../components/VehicleCard.jsx';
import useVehicles from '../hooks/useVehicles.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { FaSearch } from 'react-icons/fa';
import { MapPin, DollarSign, Zap, Sliders } from 'lucide-react';

export default function Vehicles() {
  const { vehicles, loading, fetchVehicles } = useVehicles();
  const [filters, setFilters] = useState({ 
    type: '', 
    brand: '', 
    available: '',
    priceMin: '',
    priceMax: '',
    location: '',
    searchTerm: ''
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchVehicles(Object.fromEntries(Object.entries(newFilters).filter(([, v]) => v)));
  };

  const brands = ['Honda', 'Yamaha', 'TVS', 'Hero', 'Suzuki', 'Bajaj', 'Royal Enfield'];
  const types = ['scooter', 'bike'];
  const locations = ['Kathmandu', 'Pokhara', 'Lalitpur', 'Bhaktapur', 'Chitwan', 'Butwal'];

  const resetFilters = () => {
    setFilters({ 
      type: '', 
      brand: '', 
      available: '',
      priceMin: '',
      priceMax: '',
      location: '',
      searchTerm: ''
    });
    fetchVehicles();
  };

  const activeFilterCount = Object.values(filters).filter(v => v !== '').length;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">Browse Our Fleet</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find the perfect vehicle for your Nepal adventure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg sticky top-24 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Sliders size={24} /> Filters
                  {activeFilterCount > 0 && (
                    <span className="ml-auto bg-primary text-white text-sm px-3 py-1 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h2>
              </div>

              {/* Search */}
              <div>
                <label className="block font-semibold mb-3 text-gray-900 dark:text-white">Search</label>
                <div className="relative">
                  <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vehicles..."
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <Zap size={18} /> Vehicle Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value=""
                      checked={filters.type === ''}
                      onChange={(e) => handleFilterChange('type', e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-gray-700 dark:text-gray-300">All Types</span>
                  </label>
                  {types.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={filters.type === type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <label className="block font-semibold mb-3 text-gray-900 dark:text-white">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                  <MapPin size={18} /> Location
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Advanced Filters */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2 rounded-lg transition-colors"
              >
                <Sliders size={18} /> Advanced Filters
              </motion.button>

              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4 pt-4 border-t border-gray-300 dark:border-gray-600"
                >
                  {/* Price Range */}
                  <div>
                    <label className="block font-semibold mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                      <DollarSign size={18} /> Price Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceMin}
                        onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceMax}
                        onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="block font-semibold mb-3 text-gray-900 dark:text-white">Availability</label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.available === 'true'}
                        onChange={(e) => handleFilterChange('available', e.target.checked ? 'true' : '')}
                        className="mr-2"
                      />
                      <span className="text-gray-700 dark:text-gray-300">Available Only</span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Reset Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={resetFilters}
                className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-opacity"
              >
                Reset All Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Vehicles Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSkeleton count={9} />
            ) : vehicles.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {vehicles.map((vehicle, i) => (
                  <motion.div
                    key={vehicle._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <VehicleCard vehicle={vehicle} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-2xl"
              >
                <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-4">
                  No vehicles found
                </p>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your filters to find more options
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="bg-primary hover:bg-accent text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
