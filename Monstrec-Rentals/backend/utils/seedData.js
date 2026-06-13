import mongoose from 'mongoose';
import 'dotenv/config';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import Payment from '../models/Payment.js';
import Settings from '../models/Settings.js';

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
        image: 'https://images.unsplash.com/photo-1716574400004-ba794161f8cd?w=1000',
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
        image: 'https://images.unsplash.com/photo-1684607396581-e037c3a5984d?w=1000',
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
        image: 'https://images.unsplash.com/photo-1625826425873-af4d9c357c4d?w=1000',
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
        image: 'https://cdn.bikedekho.com/upload/userfiles/images/67d961645480d.jpg?tr=w-930',
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
        image: 'https://images.unsplash.com/photo-1629616092586-636e3010398a?w=1000',
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
        image: 'https://images.unsplash.com/photo-1630167954300-aec0e9a8624c?w=1000',
        rating: 4.3,
      },
      {
        name: 'Piaggio Vespa',
        brand: 'Piaggio',
        type: 'scooter',
        model: 'Vespa S125',
        year: 2023,
        pricePerKm: 25,
        dailyRate: 1200,
        availability: true,
        licensePlate: 'BA 01 AA 0007',
        registrationNumber: 'REG007',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG007',
        chassisNumber: 'CHS007',
        description: 'Classic and stylish Vespa scooter',
        image: 'https://wlassets.vespa.com/wlassets/vespa/my/s-125/03-hotspot/Artboard-2/original/Artboard+2.png?1756453507925',
        rating: 4.9,
      },
      {
        name: 'Royal Enfield Classic',
        brand: 'Royal Enfield',
        type: 'bike',
        model: 'Classic 350',
        year: 2023,
        pricePerKm: 30,
        dailyRate: 2000,
        availability: true,
        licensePlate: 'BA 01 AA 0008',
        registrationNumber: 'REG008',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG008',
        chassisNumber: 'CHS008',
        description: 'Premium retro styling bike, perfect for adventure',
        image: 'https://www.royalenfield.com/content/dam/royal-enfield/nepal/motorcycles/classic-350/home/gma-nepal.jpg',
        rating: 4.9,
      },
      {
        name: 'Suzuki Burgman',
        brand: 'Suzuki',
        type: 'scooter',
        model: 'Burgman Street 125',
        year: 2023,
        pricePerKm: 25,
        dailyRate: 1300,
        availability: true,
        licensePlate: 'BA 01 AA 0009',
        registrationNumber: 'REG009',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG009',
        chassisNumber: 'CHS009',
        description: 'Spacious and comfortable executive scooter',
        image: 'https://imgcdn.oto.com/large/gallery/exterior/92/2828/suzuki-burgman-street-125-ex-slant-rear-view-full-image-592851.jpg',
        rating: 4.7,
      },
      {
        name: 'KTM Duke 250',
        brand: 'KTM',
        type: 'bike',
        model: 'Duke 250',
        year: 2022,
        pricePerKm: 35,
        dailyRate: 2200,
        availability: true,
        licensePlate: 'BA 01 AA 0010',
        registrationNumber: 'REG010',
        insuranceExpiry: new Date('2025-11-30'),
        engineNumber: 'ENG010',
        chassisNumber: 'CHS010',
        description: 'Powerful naked street bike with sharp handling',
        image: 'https://images.unsplash.com/photo-1610553556003-9b2ae8ef1b8e?w=1000',
        rating: 4.8,
      },
      {
        name: 'Aprilia SR 125',
        brand: 'Aprilia',
        type: 'scooter',
        model: 'SR 125',
        year: 2023,
        pricePerKm: 28,
        dailyRate: 1400,
        availability: true,
        licensePlate: 'BA 01 AA 0011',
        registrationNumber: 'REG011',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG011',
        chassisNumber: 'CHS011',
        description: 'Sporty Italian design with modern features',
        image: 'https://images.piaggio.com/aprilia/vehicles/escv000tkb/escvbrctkb/escvbrctkb-01-s.png',
        rating: 4.6,
      },
      {
        name: 'Hero Splendor Plus',
        brand: 'Hero',
        type: 'bike',
        model: 'Splendor Plus',
        year: 2023,
        pricePerKm: 18,
        dailyRate: 1300,
        availability: true,
        licensePlate: 'BA 01 AA 0012',
        registrationNumber: 'REG012',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG012',
        chassisNumber: 'CHS012',
        description: 'Economical and durable commuter bike',
        image: 'https://www.heromotocorp.com/content/dam/hero-commerce/in/en/products/practical/splendor-plus/HSPUMDRSCFIBBK/360/1.png',
        rating: 4.4,
      },
      {
        name: 'Honda PCX',
        brand: 'Honda',
        type: 'scooter',
        model: 'PCX 160',
        year: 2023,
        pricePerKm: 26,
        dailyRate: 1350,
        availability: true,
        licensePlate: 'BA 01 AA 0013',
        registrationNumber: 'REG013',
        insuranceExpiry: new Date('2025-12-31'),
        engineNumber: 'ENG013',
        chassisNumber: 'CHS013',
        description: 'Premium hybrid scooter with advanced features',
        image: 'https://images.unsplash.com/photo-1628798211398-29d5c9773fbd?w=1000',
        rating: 4.8,
      },
    ]);
    console.log('✓ Vehicles created');

    // Create Settings
    await Settings.create({
      companyName: 'Monstrec Rentals',
      companyEmail: 'monstrec-rental@gmail.com',
      companyPhone: '+977-9823423121',
      companyAddress: 'Boudha, Kathmandu, Nepal',
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
