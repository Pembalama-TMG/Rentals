import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaUsers, FaMotorcycle, FaLock } from 'react-icons/fa';
import VehicleCard from '../components/VehicleCard.jsx';
import useVehicles from '../hooks/useVehicles.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';

export default function Home() {
  const { vehicles, loading } = useVehicles();
  const popularVehicles = vehicles.slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-dark to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Rent Scooters Across Nepal
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Explore Kathmandu, Pokhara & Beyond with Our Reliable Fleet
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                to="/vehicles"
                className="bg-primary px-8 py-3 rounded-lg font-bold hover:bg-accent transition text-white"
              >
                Book Now
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-primary px-8 py-3 rounded-lg font-bold hover:bg-primary transition"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <FaMotorcycle />, title: 'Affordable Pricing', desc: 'Best rates for scooters & bikes' },
              { icon: <FaCheckCircle />, title: 'Easy Booking', desc: 'Book in just 5 minutes' },
              { icon: <FaLock />, title: 'Secure Payments', desc: 'Safe online transactions' },
              { icon: <FaUsers />, title: 'Verified Vehicles', desc: '100% authentic & maintained' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center"
              >
                <div className="text-4xl text-primary mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Vehicles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-dark">Popular Vehicles</h2>
          {loading ? (
            <LoadingSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularVehicles.map((vehicle) => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Explore Nepal?</h2>
          <p className="text-lg mb-8">Start your journey with Monstrec Rentals today!</p>
          <Link
            to="/vehicles"
            className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-light transition"
          >
            Browse All Vehicles
          </Link>
        </div>
      </section>
    </div>
  );
}
