import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaRupeeSign } from 'react-icons/fa';

export default function Pricing() {
  const pricingPlans = [
    {
      type: 'Scooter',
      image: '🛴',
      perKm: 20,
      daily: 1000,
      features: ['Per KM Rental', 'Full Day Rental', 'Fuel Included', 'Insurance Covered', '24/7 Support'],
    },
    {
      type: 'Bike',
      image: '🏍️',
      perKm: 20,
      daily: 1500,
      features: ['Per KM Rental', 'Full Day Rental', 'Fuel Included', 'Insurance Covered', '24/7 Support'],
    },
  ];

  return (
    <div className="min-h-screen bg-light py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-dark">Simple & Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Best rates for scooters and bikes in Nepal</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="text-6xl mb-4">{plan.image}</div>
              <h2 className="text-2xl font-bold mb-6">{plan.type}</h2>

              <div className="space-y-4 mb-8">
                <div className="bg-light p-4 rounded-lg">
                  <p className="text-gray-600">Per Kilometer</p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    <FaRupeeSign className="text-primary" /> {plan.perKm}
                  </p>
                </div>
                <div className="bg-light p-4 rounded-lg">
                  <p className="text-gray-600">Full Day</p>
                  <p className="text-3xl font-bold flex items-center gap-2">
                    <FaRupeeSign className="text-primary" /> {plan.daily}
                  </p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-accent transition">
                Book Now
              </button>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-4">Additional Charges & Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Included in All Rentals</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Full Tank</li>
                <li>✓ Third-party Insurance</li>
                <li>✓ Helmet & Lock</li>
                <li>✓ 24/7 Customer Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Taxes & Fees</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ 13% VAT included in all prices</li>
                <li>✓ 10% cancellation fee (if within 24 hours)</li>
                <li>✓ Damage charges as per policy</li>
                <li>✓ Late return: NPR 100/hour</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
