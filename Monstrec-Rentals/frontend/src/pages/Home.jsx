import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import { MapPin } from 'lucide-react';
import VehicleCard from '../components/VehicleCard.jsx';
import BookingModal from '../components/BookingModal.jsx';
import OptimizedImage from '../components/OptimizedImage.jsx';
import useVehicles from '../hooks/useVehicles.js';
import LoadingSkeleton from '../components/LoadingSkeleton.jsx';
import NepalMap from '../components/NepalMap.jsx';
import { DEFAULT_IMAGES } from '../config/imagekit.js';

export default function Home() {
  const { vehicles, loading } = useVehicles();
  const popularVehicles = vehicles.slice(0, 6);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const yOffset = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Booking Modal state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleBookNow = (vehicle) => {
    setSelectedVehicle(vehicle);
    setBookingModalOpen(true);
  };

  const destinations = [
    { name: 'Kathmandu', image: 'https://peakvisor.com/photo/HD/Kathmandu-distant-view-nyatapola-temple-taumadhi-square-1559765687.jpg', cost: '₨500/day', routes: '15 Popular Routes' },
    { name: 'Pokhara', image: 'https://www.acethehimalaya.com/wp-content/uploads/2024/02/things-to-do-in-pokhara.jpg', cost: '₨400/day', routes: '12 Popular Routes' },
    { name: 'Chitwan', image: 'https://www.thirdrockadventures.com/assets-back/images/blog/chitwan-national-park.jpgnB3.jpg', cost: '₨450/day', routes: '10 Popular Routes' },
    { name: 'Lumbini', image: 'https://dynamic-media.tacdn.com/media/photo-o/2e/f6/3d/a6/caption.jpg?w=1400&h=1000&s=1', cost: '₨350/day', routes: '8 Popular Routes' },
    { name: 'Mustang', image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/5d/17/bd/muktinath-temple.jpg?w=600&h=500&s=1', cost: '₨600/day', routes: '6 Popular Routes' },
    { name: 'Butwal', image: 'https://risingnepaldaily.com/storage/media/26250/118582708_4262380870503511_7191211685942392003_n.jpg', cost: '₨380/day', routes: '9 Popular Routes' },
  ];

  const testimonials = [
    { name: 'Raj Kumar', rating: 5, text: 'Great service! The bike was in excellent condition. Highly recommended!', image: '👨‍💼' },
    { name: 'Priya Singh', rating: 5, text: 'Best rental experience in Nepal. Professional staff and easy booking.', image: '👩‍💼' },
    { name: 'Amit Patel', rating: 4.5, text: 'Affordable prices and reliable vehicles. Will definitely use again.', image: '👨‍💼' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark via-secondary to-primary dark:from-gray-800 dark:via-gray-900 dark:to-primary"
      >
        {/* Background parallax layers */}
        <motion.div
          style={{ y: yOffset }}
          className="absolute inset-0 opacity-40"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60" />
          <OptimizedImage
            src="https://larentalsmalta.com/wp-content/uploads/2023/11/Untitled-design-2.jpg"
            alt="Hero Background"
            className="w-full h-full"
            objectFit="cover"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 
              className="text-6xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Explore Nepal
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Your Way
              </span>
            </motion.h1>

            <motion.p 
              className="text-2xl text-gray-200 mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Rent premium scooters and bikes to explore Kathmandu, Pokhara, and beyond
            </motion.p>

            <motion.div 
              className="flex gap-6 justify-center flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link
                to="/vehicles"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-2xl px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300 flex items-center gap-2 group"
              >
                Book Now
                <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-white hover:bg-white hover:text-dark px-10 py-4 rounded-full font-bold text-white text-lg transition-all duration-300"
              >
                View Pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <div className="text-2xl">↓</div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            Why Choose Monstrec?
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                image: DEFAULT_IMAGES.affordablePricing, 
                title: 'Affordable Pricing', 
                desc: 'Best rates for scooters & bikes in Nepal' 
              },
              { 
                image: DEFAULT_IMAGES.easyBooking, 
                title: 'Easy Booking', 
                desc: 'Book in just 5 minutes, no hassle' 
              },
              { 
                image: 'https://static.vecteezy.com/system/resources/thumbnails/029/899/733/small_2x/secure-payment-credit-card-icon-with-shield-secure-transaction-stock-illustration-vector.jpg', 
                title: 'Secure Payments', 
                desc: 'Safe online transactions with encryption' 
              },
              { 
                image: DEFAULT_IMAGES.verifiedOwners, 
                title: 'Verified Owners', 
                desc: '100% authentic & well-maintained vehicles' 
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  {/* Feature Image */}
                  <OptimizedImage
                    src={feature.image}
                    alt={feature.title}
                    className="h-full w-full"
                    objectFit="cover"
                    animate={true}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent group-hover:from-gray-900/80 transition-all duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            Popular Destinations
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-3">{dest.name}</h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-lg font-semibold">{dest.cost}</p>
                      <p className="text-sm text-gray-200 flex items-center gap-1">
                        <MapPin size={16} /> {dest.routes}
                      </p>
                    </div>
                    <Link
                      to="/vehicles"
                      className="bg-primary hover:bg-accent px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Book
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-16">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-5xl font-bold text-gray-900 dark:text-white"
            >
              Featured Vehicles
            </motion.h2>
            <Link
              to="/vehicles"
              className="text-primary hover:text-accent font-semibold flex items-center gap-2 transition-colors"
            >
              View All <FaArrowRight />
            </Link>
          </div>

          {loading ? (
            <LoadingSkeleton count={3} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularVehicles.map((vehicle, i) => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <VehicleCard vehicle={vehicle} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Nepal Map Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            Our Coverage Areas
          </motion.h2>
          <NepalMap />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900">
        <div className="container mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-5xl font-bold text-center mb-16 text-gray-900 dark:text-white"
          >
            What Our Customers Say
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">{testimonial.image}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">{testimonial.name}</h4>
                    <div className="flex text-amber-400">
                      {[...Array(Math.floor(testimonial.rating))].map((_, j) => (
                        <FaStar key={j} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 bg-gradient-to-r from-primary via-accent to-primary dark:from-gray-800 dark:via-primary dark:to-gray-800 text-white overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"
        />

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Explore Nepal?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of happy travelers who have experienced the beauty of Nepal with Monstrec Rentals
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/vehicles"
                className="bg-white text-primary hover:bg-gray-100 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
              </Link>
              <Link
                to="/owner/register"
                className="border-2 border-white hover:bg-white hover:text-primary px-10 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                Become a Partner
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedVehicle && (
        <BookingModal
          isOpen={bookingModalOpen}
          onClose={() => {
            setBookingModalOpen(false);
            setSelectedVehicle(null);
          }}
          vehicle={selectedVehicle}
          locations={['Kathmandu', 'Pokhara', 'Chitwan', 'Lumbini', 'Mustang', 'Butwal']}
        />
      )}
    </div>
  );
}
