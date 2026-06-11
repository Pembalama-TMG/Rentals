import User from '../models/User.js';
import Owner from '../models/Owner.js';
import { generateToken } from '../utils/jwt.js';
import { sendEmail } from '../config/email.js';

// Register User
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, city } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      city,
    });

    const token = generateToken(user._id, user.role);

    // Send welcome email
    try {
      await sendEmail(
        email,
        'Welcome to Monstrec Rentals',
        `
        <h2>Welcome ${firstName}!</h2>
        <p>Your account has been successfully created.</p>
        <p>Start renting scooters and bikes in Nepal today!</p>
        `
      );
    } catch (emailError) {
      console.log('Email not sent but user created:', emailError);
    }

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Profile
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

// Update Profile
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address, city, avatar } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstName, lastName, phone, address, city, avatar },
      { new: true, runValidators: true }
    );

    res.json({
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    next(error);
  }
};

// Change Password
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    next(error);
  }
};

// Register as Owner
export const registerOwner = async (req, res, next) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      confirmPassword,
      address,
      city,
      bankName,
      accountNumber,
      accountHolderName,
    } = req.body;

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Split fullName into firstName and lastName
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || 'Owner';

    // Create owner user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      city,
      role: 'owner',
      bankName,
      accountNumber,
      accountHolderName,
      ownerVerified: false, // Requires admin approval
    });

    // Create owner profile
    const owner = await Owner.create({
      userId: user._id,
      bankDetails: {
        bankName,
        accountHolderName,
        accountNumber,
      },
      verified: false, // Requires admin verification
    });

    const token = generateToken(user._id, user.role);

    // Send welcome email
    try {
      await sendEmail(
        email,
        'Welcome to Monstrec Rentals - Vehicle Partner',
        `
        <h2>Welcome ${firstName}!</h2>
        <p>Your owner application has been submitted successfully.</p>
        <p>Our admin team will review your documents and approve your account within 24-48 hours.</p>
        <p>You'll receive an email notification once your account is verified.</p>
        <p>Thank you for joining Monstrec Rentals!</p>
        `
      );
    } catch (emailError) {
      console.log('Email not sent but owner created:', emailError);
    }

    res.status(201).json({
      message: 'Owner registration submitted successfully. Awaiting admin approval.',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        ownerVerified: user.ownerVerified,
      },
    });
  } catch (error) {
    next(error);
  }
};
