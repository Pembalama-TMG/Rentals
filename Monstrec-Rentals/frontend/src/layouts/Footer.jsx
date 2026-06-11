import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Monstrec Rentals</h3>
            <p className="text-gray-300 mb-4">Your trusted partner for scooter and bike rentals across Nepal.</p>
            <div className="flex gap-4">
              <FaFacebook className="text-2xl hover:text-primary cursor-pointer transition" />
              <FaInstagram className="text-2xl hover:text-primary cursor-pointer transition" />
              <FaTwitter className="text-2xl hover:text-primary cursor-pointer transition" />
              <FaYoutube className="text-2xl hover:text-primary cursor-pointer transition" />
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/" className="hover:text-primary transition">Home</a></li>
              <li><a href="/vehicles" className="hover:text-primary transition">Browse Vehicles</a></li>
              <li><a href="/pricing" className="hover:text-primary transition">Pricing</a></li>
              <li><a href="/about" className="hover:text-primary transition">About Us</a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-primary transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-primary transition">FAQ</a></li>
              <li><a href="#" className="hover:text-primary transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition">Privacy Policy</a></li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center gap-2">
                <FaPhone className="text-primary" />
                <span>+977-9823423121</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>monstrec-rental@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                <span>Boudha, Kathmandu, Nepal</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>&copy; 2024 Monstrec Rentals. All rights reserved.</p>
          <p>Made with ❤️ for Nepal 🇳🇵</p>
        </div>
      </div>
    </footer>
  );
}
