import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from './config/database.js';
import User from './models/User.js';
import Vehicle from './models/Vehicle.js';
import Booking from './models/Booking.js';
import Payment from './models/Payment.js';
import Settings from './models/Settings.js';

const seedData = async () => {
  try {
    await connectDB();
    console.log('Connected to database. Seeding data...\n');

    // Clear existing data
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    await Booking.deleteMany({});
    await Payment.deleteMany({});
    await Settings.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create Admin User
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@monstrec.com',
      password: 'Admin@123',
      phone: '+977-9800000000',
      role: 'admin',
      city: 'Kathmandu',
      isVerified: true,
    });
    console.log('✓ Admin user created');

    // Create Customer Users
    const customers = await User.insertMany([
      {
        firstName: 'Ramesh',
        lastName: 'Kumar',
        email: 'ramesh@example.com',
        password: 'Password@123',
        phone: '+977-9841234567',
        city: 'Kathmandu',
        isVerified: true,
      },
      {
        firstName: 'Priya',
        lastName: 'Sharma',
        email: 'priya@example.com',
        password: 'Password@123',
        phone: '+977-9809876543',
        city: 'Pokhara',
        isVerified: true,
      },
      {
        firstName: 'Suresh',
        lastName: 'Paudel',
        email: 'suresh@example.com',
        password: 'Password@123',
        phone: '+977-9850000000',
        city: 'Lalitpur',
        isVerified: false,
      },
    ]);
    console.log('✓ Customer users created');

    // Create Vehicles
    const vehicles = await Vehicle.insertMany([
      {
        name: 'Honda Activa',
        brand: 'Honda',
        type: 'scooter',
        model: 'Activa 6G',
        year: 2023,
        pricePerKm: 20,
        dailyRate: 1000,
        availability: true,
        licensePlate: 'BA 01 AA 0001',
        registrationNumber: 'REG001',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG001',
        chassisNumber: 'CHS001',
        description: 'Reliable and fuel-efficient scooter',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        rating: 4.5,
      },
      {
        name: 'Honda CB Shine',
        brand: 'Honda',
        type: 'bike',
        model: 'CB Shine',
        year: 2023,
        pricePerKm: 20,
        dailyRate: 1500,
        availability: true,
        licensePlate: 'BA 01 AA 0002',
        registrationNumber: 'REG002',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG002',
        chassisNumber: 'CHS002',
        description: 'Smooth and reliable commuter bike',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
        rating: 4.7,
      },
      {
        name: 'Yamaha FZ-Fi',
        brand: 'Yamaha',
        type: 'bike',
        model: 'FZ-Fi V3.0',
        year: 2022,
        pricePerKm: 20,
        dailyRate: 1500,
        availability: true,
        licensePlate: 'BA 01 AA 0003',
        registrationNumber: 'REG003',
        insuranceExpiry: new Date('2025-11-30'),
        engineNumber: 'ENG003',
        chassisNumber: 'CHS003',
        description: 'Sport styled bike with great performance',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400',
        rating: 4.8,
      },
      {
        name: 'TVS Jupiter',
        brand: 'TVS',
        type: 'scooter',
        model: 'Jupiter ZX',
        year: 2023,
        pricePerKm: 20,
        dailyRate: 1000,
        availability: true,
        licensePlate: 'BA 01 AA 0004',
        registrationNumber: 'REG004',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG004',
        chassisNumber: 'CHS004',
        description: 'Smooth automatic scooter',
        image: 'https://images.unsplash.com/photo-1525231560007-0667ffdde9c2?w=400',
        rating: 4.4,
      },
      {
        name: 'Bajaj Pulsar',
        brand: 'Bajaj',
        type: 'bike',
        model: 'Pulsar 125',
        year: 2022,
        pricePerKm: 20,
        dailyRate: 1500,
        availability: true,
        licensePlate: 'BA 01 AA 0005',
        registrationNumber: 'REG005',
        insuranceExpiry: new Date('2025-10-31'),
        engineNumber: 'ENG005',
        chassisNumber: 'CHS005',
        description: 'Sporty and fuel-efficient',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400',
        rating: 4.6,
      },
      {
        name: 'Hero HF Deluxe',
        brand: 'Hero',
        type: 'bike',
        model: 'HF Deluxe',
        year: 2023,
        pricePerKm: 20,
        dailyRate: 1500,
        availability: true,
        licensePlate: 'BA 01 AA 0006',
        registrationNumber: 'REG006',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG006',
        chassisNumber: 'CHS006',
        description: 'Budget-friendly and reliable',
        image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400',
        rating: 4.3,
      },
    ]);
    console.log('✓ Vehicles created');

    // Create Bookings
    const now = new Date();
    const bookings = await Booking.insertMany([
      {
        userId: customers[0]._id,
        vehicleId: vehicles[0]._id,
        startDate: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 48 * 60 * 60 * 1000),
        rentalType: 'fullDay',
        pickupLocation: 'Kathmandu Central',
        dropoffLocation: 'Thamel',
        baseCost: 1000,
        totalCost: 1130,
        status: 'confirmed',
        paymentStatus: 'completed',
        paymentMethod: 'esewa',
      },
      {
        userId: customers[1]._id,
        vehicleId: vehicles[1]._id,
        startDate: new Date(now.getTime() + 72 * 60 * 60 * 1000),
        endDate: new Date(now.getTime() + 96 * 60 * 60 * 1000),
        rentalType: 'fullDay',
        pickupLocation: 'Pokhara Lake Side',
        dropoffLocation: 'Pokhara Airport',
        baseCost: 1500,
        totalCost: 1695,
        status: 'pending',
        paymentStatus: 'pending',
        paymentMethod: 'khalti',
      },
    ]);
    console.log('✓ Bookings created');

    // Create Payments
    await Payment.insertMany([
      {
        bookingId: bookings[0]._id,
        userId: customers[0]._id,
        amount: 1130,
        paymentMethod: 'esewa',
        paymentStatus: 'completed',
        paymentGatewayResponse: {
          transactionCode: 'TXN001',
          statusCode: '0',
          statusMessage: 'Success',
        },
      },
    ]);
    console.log('✓ Payments created');

    // Create Settings
    await Settings.create({
      companyName: 'Monstrec Rentals',
      companyEmail: 'info@monstrec.com',
      companyPhone: '+977-1-4123456',
      companyAddress: 'Thamel, Kathmandu, Nepal',
      scooterPricePerKm: 20,
      scooterDailyRate: 1000,
      bikePricePerKm: 20,
      bikeDailyRate: 1500,
      taxPercent: 13,
      cancellationPenaltyPercent: 10,
    });
    console.log('✓ Settings created');

    console.log('\n✓ All seed data created successfully!');
    console.log('\n📋 Credentials:');
    console.log('Admin Email: admin@monstrec.com');
    console.log('Admin Password: Admin@123');
    console.log('\nCustomer Email: ramesh@example.com');
    console.log('Customer Password: Password@123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
