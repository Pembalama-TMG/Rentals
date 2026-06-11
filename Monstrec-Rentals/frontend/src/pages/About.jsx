import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaAward, FaGlobeAmericas, FaHandshake } from 'react-icons/fa';

export default function About() {
  return (
    <div className="min-h-screen bg-light py-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-dark">About Monstrec Rentals</h1>
          <p className="text-xl text-gray-600">Your Trusted Partner for Scooter & Bike Rentals in Nepal</p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
            <p className="text-gray-700">
              To provide affordable, reliable, and convenient scooter and bike rental services across Nepal, 
              making it easy for locals and tourists to explore the beautiful landscapes of Nepal.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
            <p className="text-gray-700">
              To become the leading rental platform in Nepal by offering exceptional customer service, 
              well-maintained vehicles, and competitive pricing.
            </p>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-dark">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: <FaAward />, title: 'Quality', desc: 'Best vehicles maintained regularly' },
              { icon: <FaUsers />, title: 'Customer First', desc: 'Dedicated to customer satisfaction' },
              { icon: <FaGlobeAmericas />, title: 'Accessibility', desc: 'Easy and affordable for all' },
              { icon: <FaHandshake />, title: 'Trust', desc: 'Transparent and honest dealings' },
            ].map((value, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="text-4xl text-primary mb-3 flex justify-center">{value.icon}</div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-accent text-white py-12 rounded-2xl mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold mb-2">1000+</p>
              <p>Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p>Vehicles</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5000+</p>
              <p>Rentals Completed</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">4.8/5</p>
              <p>Avg. Rating</p>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">Have questions? We'd love to hear from you!</p>
          <div className="space-y-2">
            <p><strong>Email:</strong> info@monstrec.com</p>
            <p><strong>Phone:</strong> +977-1-4123456</p>
            <p><strong>Address:</strong> Thamel, Kathmandu, Nepal</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
