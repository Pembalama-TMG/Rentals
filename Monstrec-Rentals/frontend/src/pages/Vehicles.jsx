import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VehicleCard from '../components/VehicleCard.jsx';
import useVehicles from '../hooks/useVehicles.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import { FaFilter } from 'react-icons/fa';

export default function Vehicles() {
  const { vehicles, loading, fetchVehicles } = useVehicles();
  const [filters, setFilters] = useState({ type: '', brand: '', available: '' });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    fetchVehicles(Object.fromEntries(Object.entries(newFilters).filter(([, v]) => v)));
  };

  const brands = ['Honda', 'Yamaha', 'TVS', 'Hero', 'Suzuki', 'Bajaj', 'Royal Enfield'];
  const types = ['scooter', 'bike'];

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8 text-dark"
        >
          Browse Our Fleet
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <FaFilter /> Filters
              </h2>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">Vehicle Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability Filter */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">Availability</label>
                <select
                  value={filters.available}
                  onChange={(e) => handleFilterChange('available', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">All</option>
                  <option value="true">Available Only</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setFilters({ type: '', brand: '', available: '' });
                  fetchVehicles();
                }}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-accent transition"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>

          {/* Vehicles Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <LoadingSkeleton count={9} />
            ) : vehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vehicles.map((vehicle) => (
                  <VehicleCard key={vehicle._id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No vehicles found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
