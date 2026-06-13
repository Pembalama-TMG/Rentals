import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaRupeeSign, FaCalendar } from 'react-icons/fa';
import { vehicleAPI, bookingAPI } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import useAuth from '../hooks/useAuth.js';
import toast from 'react-hot-toast';

export default function VehicleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    startDate: '',
    endDate: '',
    rentalType: 'fullDay',
    pickupLocation: 'Kathmandu Central',
    dropoffLocation: 'Kathmandu Central',
    distance: 0,
  });
  const [totalCost, setTotalCost] = useState(0);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const data = await vehicleAPI.getVehicleById(id);
        setVehicle(data.vehicle);
      } catch (error) {
        toast.error('Failed to load vehicle');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  useEffect(() => {
    if (booking.startDate && booking.endDate && vehicle) {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

      let cost = 0;
      if (booking.rentalType === 'fullDay') {
        cost = days * vehicle.dailyRate;
      } else {
        cost = booking.distance * vehicle.pricePerKm;
      }
      const tax = cost * 0.13;
      setTotalCost(cost + tax);
    }
  }, [booking, vehicle]);

  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }

    if (!booking.startDate || !booking.endDate) {
      toast.error('Please select dates');
      return;
    }

    try {
      await bookingAPI.createBooking({
        vehicleId: id,
        ...booking,
      });
      toast.success('Booking created! Proceed to payment.');
      navigate('/customer/bookings');
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!vehicle) return <div>Vehicle not found</div>;

  return (
    <div className="min-h-screen bg-light py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Vehicle Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img
                src={vehicle.image}
                alt={vehicle.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-4xl font-bold text-dark">{vehicle.name}</h1>
                    <p className="text-gray-600">{vehicle.brand} {vehicle.model} • {vehicle.year}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-2 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-lg font-bold text-primary">{vehicle.rating}/5</span>
                  </div>
                </div>

                <p className="text-gray-700 mb-8">{vehicle.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-light p-4 rounded-lg">
                    <p className="text-gray-600">Per Kilometer</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      <FaRupeeSign /> {vehicle.pricePerKm}
                    </p>
                  </div>
                  <div className="bg-light p-4 rounded-lg">
                    <p className="text-gray-600">Per Day</p>
                    <p className="text-2xl font-bold flex items-center gap-1">
                      <FaRupeeSign /> {vehicle.dailyRate}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-xl font-bold mb-4">Vehicle Specs</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <p><span className="font-semibold">License Plate:</span> {vehicle.licensePlate}</p>
                    <p><span className="font-semibold">Registration:</span> {vehicle.registrationNumber}</p>
                    <p><span className="font-semibold">Condition:</span> {vehicle.condition}</p>
                    <p><span className="font-semibold">Mileage:</span> {vehicle.mileage} km</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold mb-6 text-dark">Book This Vehicle</h2>

              <div className="space-y-4">
                {/* Rental Type */}
                <div>
                  <label className="block font-semibold mb-2">Rental Type</label>
                  <select
                    value={booking.rentalType}
                    onChange={(e) => setBooking({ ...booking, rentalType: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="fullDay">Full Day</option>
                    <option value="perKm">Per Kilometer</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block font-semibold mb-2 flex items-center gap-2">
                    <FaCalendar /> Start Date
                  </label>
                  <input
                    type="date"
                    value={booking.startDate}
                    onChange={(e) => setBooking({ ...booking, startDate: e.target.value })}
                    min={getTodayDate()}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="block font-semibold mb-2 flex items-center gap-2">
                    <FaCalendar /> End Date
                  </label>
                  <input
                    type="date"
                    value={booking.endDate}
                    onChange={(e) => setBooking({ ...booking, endDate: e.target.value })}
                    min={booking.startDate || getTodayDate()}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Distance (if Per KM) */}
                {booking.rentalType === 'perKm' && (
                  <div>
                    <label className="block font-semibold mb-2">Distance (km)</label>
                    <input
                      type="number"
                      value={booking.distance}
                      onChange={(e) => setBooking({ ...booking, distance: parseFloat(e.target.value) })}
                      className="w-full p-2 border rounded-lg"
                      min="0"
                    />
                  </div>
                )}

                {/* Pickup Location */}
                <div>
                  <label className="block font-semibold mb-2">Pickup Location</label>
                  <input
                    type="text"
                    value={booking.pickupLocation}
                    onChange={(e) => setBooking({ ...booking, pickupLocation: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Dropoff Location */}
                <div>
                  <label className="block font-semibold mb-2">Dropoff Location</label>
                  <input
                    type="text"
                    value={booking.dropoffLocation}
                    onChange={(e) => setBooking({ ...booking, dropoffLocation: e.target.value })}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                {/* Total Cost */}
                <div className="bg-light p-4 rounded-lg border-2 border-primary">
                  <p className="text-gray-600 mb-2">Total Cost (incl. 13% tax)</p>
                  <p className="text-3xl font-bold text-primary flex items-center gap-1">
                    <FaRupeeSign /> {totalCost.toFixed(2)}
                  </p>
                </div>

                {/* Book Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBooking}
                  disabled={!vehicle.availability}
                  className={`w-full py-3 rounded-lg font-bold transition ${
                    vehicle.availability
                      ? 'bg-primary text-white hover:bg-accent'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                >
                  {vehicle.availability ? 'Book Now' : 'Not Available'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
