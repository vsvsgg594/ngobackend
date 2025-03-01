import User from './model/user.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected:', conn.connection.host);

    // Admin credentials
    const email = 'admin@786gmail.com';
    const password = 'adminpassword786'; // Change this to the desired password
    const name = 'Admin User';
    const designation = 'System Administrator';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists:', existingAdmin);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create the admin user
    const adminUser = new User({
      name,
      designation,
      email,
      password: hashedPassword,
      role: 'admin', // Set role to 'admin'
    });

    // Save the admin user to the database
    await adminUser.save();
    console.log('Admin user created successfully:', adminUser);
  } catch (err) {
    console.error('Failed to create admin:', err);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
};

// Run the function to create the admin user
createAdmin();