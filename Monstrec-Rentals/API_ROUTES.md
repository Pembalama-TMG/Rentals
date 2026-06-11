# 📚 Complete API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
All authenticated endpoints require:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+977-9841234567",
  "city": "Kathmandu"
}

Response: {
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response: {
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "firstName": "John",
    "role": "customer"
  }
}
```

### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>

Response: {
  "user": {
    "id": "...",
    "firstName": "John",
    "email": "john@example.com",
    ...
  }
}
```

### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "phone": "+977-9809876543",
  "address": "New Address",
  "city": "Pokhara"
}

Response: {
  "message": "Profile updated successfully",
  "user": {...}
}
```

### Change Password
```http
PUT /auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "oldPassword": "oldpass123",
  "newPassword": "newpass123"
}

Response: {
  "message": "Password changed successfully"
}
```

---

## 🛴 Vehicle Endpoints

### Get All Vehicles
```http
GET /vehicles
GET /vehicles?type=scooter
GET /vehicles?brand=Honda
GET /vehicles?available=true
GET /vehicles?type=bike&brand=Yamaha

Response: {
  "count": 6,
  "vehicles": [{
    "_id": "...",
    "name": "Honda Activa",
    "brand": "Honda",
    "type": "scooter",
    "pricePerKm": 20,
    "dailyRate": 1000,
    "availability": true,
    "image": "...",
    "rating": 4.5
  }]
}
```

### Get Vehicle by ID
```http
GET /vehicles/:id

Response: {
  "vehicle": {
    "_id": "...",
    "name": "Honda Activa",
    ...
  }
}
```

### Get Vehicle Statistics
```http
GET /vehicles/stats

Response: {
  "totalVehicles": 6,
  "availableVehicles": 4,
  "unavailableVehicles": 2,
  "scooters": 3,
  "bikes": 3
}
```

### Create Vehicle (Admin)
```http
POST /vehicles
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Honda Activa",
  "brand": "Honda",
  "type": "scooter",
  "model": "Activa 6G",
  "year": 2023,
  "pricePerKm": 20,
  "dailyRate": 1000,
  "description": "Reliable and fuel-efficient",
  "licensePlate": "BA 01 AA 0001",
  "registrationNumber": "REG001",
  "insuranceExpiry": "2025-12-31",
  "image": <file>
}

Response: {
  "message": "Vehicle created successfully",
  "vehicle": {...}
}
```

### Update Vehicle (Admin)
```http
PUT /vehicles/:id
Authorization: Bearer <admin_token>
Content-Type: multipart/form-data

{
  "name": "Honda Activa Updated",
  "dailyRate": 1100,
  "image": <file>
}

Response: {
  "message": "Vehicle updated successfully",
  "vehicle": {...}
}
```

### Delete Vehicle (Admin)
```http
DELETE /vehicles/:id
Authorization: Bearer <admin_token>

Response: {
  "message": "Vehicle deleted successfully"
}
```

---

## 📅 Booking Endpoints

### Get All Bookings
```http
GET /bookings
Authorization: Bearer <token>
GET /bookings?status=pending
GET /bookings?status=completed

Response: {
  "count": 10,
  "bookings": [{
    "_id": "...",
    "bookingId": "BK16186942...",
    "userId": {...},
    "vehicleId": {...},
    "startDate": "2024-06-15T00:00:00Z",
    "endDate": "2024-06-16T00:00:00Z",
    "rentalType": "fullDay",
    "baseCost": 1000,
    "totalCost": 1130,
    "status": "pending",
    "paymentStatus": "pending"
  }]
}
```

### Get Booking by ID
```http
GET /bookings/:id
Authorization: Bearer <token>

Response: {
  "booking": {...}
}
```

### Create Booking
```http
POST /bookings
Authorization: Bearer <customer_token>
Content-Type: application/json

{
  "vehicleId": "...",
  "startDate": "2024-06-15",
  "endDate": "2024-06-16",
  "rentalType": "fullDay",
  "distance": 0,
  "pickupLocation": "Kathmandu Central",
  "dropoffLocation": "Thamel"
}

Response: {
  "message": "Booking created successfully",
  "booking": {...}
}
```

### Update Booking Status (Admin)
```http
PUT /bookings/:id/status
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "status": "confirmed",
  "adminNotes": "Confirmed by admin"
}

Response: {
  "message": "Booking confirmed successfully",
  "booking": {...}
}
```

Possible statuses: `pending`, `confirmed`, `active`, `completed`, `cancelled`, `rejected`

### Cancel Booking
```http
PUT /bookings/:id/cancel
Authorization: Bearer <customer_token>
Content-Type: application/json

{
  "cancellationReason": "Changed my mind"
}

Response: {
  "message": "Booking cancelled successfully",
  "refundAmount": 1017
}
```

### Complete Booking (Admin)
```http
PUT /bookings/:id/complete
Authorization: Bearer <admin_token>

Response: {
  "message": "Booking completed successfully",
  "booking": {...}
}
```

---

## 💳 Payment Endpoints

### Create Payment
```http
POST /payments
Authorization: Bearer <token>
Content-Type: application/json

{
  "bookingId": "...",
  "paymentMethod": "esewa"
}

Response: {
  "message": "Payment initiated",
  "payment": {
    "_id": "...",
    "transactionId": "TXN...",
    "amount": 1130,
    "paymentStatus": "pending"
  }
}
```

### Get All Payments (Admin)
```http
GET /payments
Authorization: Bearer <admin_token>

Response: {
  "count": 5,
  "payments": [{
    "_id": "...",
    "bookingId": "...",
    "amount": 1130,
    "paymentMethod": "esewa",
    "paymentStatus": "completed"
  }]
}
```

### Get User Payments
```http
GET /payments/user/payments
Authorization: Bearer <token>

Response: {
  "count": 2,
  "payments": [...]
}
```

### Get Payment Statistics (Admin)
```http
GET /payments/stats
Authorization: Bearer <admin_token>

Response: {
  "totalPayments": 10,
  "completedPayments": 8,
  "totalRevenue": 11300,
  "paymentsByMethod": [
    { "_id": "esewa", "count": 6, "amount": 6780 },
    { "_id": "khalti", "count": 2, "amount": 2260 }
  ]
}
```

### Verify Payment (Webhook)
```http
POST /payments/verify
Content-Type: application/json

{
  "transactionId": "TXN...",
  "paymentMethod": "esewa",
  "statusCode": "0",
  "statusMessage": "Success"
}

Response: {
  "message": "Payment verified",
  "payment": {...}
}
```

---

## 👥 User Endpoints (Admin)

### Get All Users
```http
GET /users
Authorization: Bearer <admin_token>
GET /users?role=customer

Response: {
  "count": 4,
  "users": [{
    "_id": "...",
    "firstName": "John",
    "email": "john@example.com",
    "role": "customer",
    "totalRentals": 2
  }]
}
```

### Get User by ID
```http
GET /users/:id
Authorization: Bearer <token>

Response: {
  "user": {...}
}
```

### Get User Statistics (Admin)
```http
GET /users/stats
Authorization: Bearer <admin_token>

Response: {
  "totalUsers": 4,
  "customers": 3,
  "admins": 1,
  "verifiedUsers": 3,
  "unverifiedUsers": 1
}
```

### Get User Booking History
```http
GET /users/:id/bookings
Authorization: Bearer <token>

Response: {
  "count": 2,
  "bookings": [...]
}
```

### Update User (Admin)
```http
PUT /users/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe",
  "role": "admin",
  "isVerified": true
}

Response: {
  "message": "User updated successfully",
  "user": {...}
}
```

### Delete User (Admin)
```http
DELETE /users/:id
Authorization: Bearer <admin_token>

Response: {
  "message": "User deleted successfully"
}
```

---

## 📊 Analytics Endpoints (Admin)

### Get Dashboard Statistics
```http
GET /analytics/dashboard
Authorization: Bearer <admin_token>

Response: {
  "bookings": {
    "total": 10,
    "completed": 8,
    "pending": 1,
    "cancelled": 1
  },
  "users": { "total": 4 },
  "vehicles": {
    "total": 6,
    "available": 4
  },
  "revenue": {
    "total": 11300,
    "monthly": [...]
  },
  "popularVehicles": [...]
}
```

### Get Monthly Report
```http
GET /analytics/monthly?month=6&year=2024
Authorization: Bearer <admin_token>

Response: {
  "month": 6,
  "year": 2024,
  "totalBookings": 5,
  "completedBookings": 4,
  "totalRevenue": 5650,
  "avgBookingValue": 1130
}
```

### Get Daily Revenue
```http
GET /analytics/daily-revenue
Authorization: Bearer <admin_token>

Response: {
  "dailyRevenue": [
    {
      "_id": "2024-06-10",
      "revenue": 1130,
      "transactions": 1
    }
  ]
}
```

### Get Popular Routes
```http
GET /analytics/popular-routes
Authorization: Bearer <admin_token>

Response: {
  "routes": [
    {
      "_id": {
        "pickup": "Kathmandu Central",
        "dropoff": "Thamel"
      },
      "bookings": 3
    }
  ]
}
```

### Get Vehicle Performance
```http
GET /analytics/vehicle-performance
Authorization: Bearer <admin_token>

Response: {
  "performance": [
    {
      "_id": "...",
      "name": "Honda Activa",
      "bookings": 5,
      "rating": 4.5,
      "totalEarnings": 5650
    }
  ]
}
```

---

## Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid data |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error |

---

## Error Response Format

```json
{
  "message": "Error description"
}
```

---

## Rate Limiting

- 100 requests per 15 minutes per IP

---

**Last Updated**: June 2024
