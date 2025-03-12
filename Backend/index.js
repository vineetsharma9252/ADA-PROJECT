const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require('./db/db');
const User = require('./db/UserSchema');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Application = require('./db/applicationform');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// JWT Secret Key
const secretKey = process.env.JWT_SECRET_KEY;

// User Registration
app.post("/create", async (req, res) => {
  const { firstName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      email,
      hash: hashedPassword
    });

    await newUser.save();
    const payload = { firstName, email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token
    });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Failed to register user" });
  }
});

// User Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { email };
    const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, firstName: user.firstName },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});


app.post('/api/applications', async (req, res) => {
  try {
    const applicationData = req.body;
    console.log(applicationData); // Log received data
   //New instance of Application
    const newApplication = new Application(applicationData);
    //Saved in mongodb
    const savedApplication = await newApplication.save();

    // Process of data
    res.status(201).json({
      message: 'Application received sucessfully.',
      application: savedApplication
    });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ 
      message: 'Error saving application', error
     });
  }

  
});




// Start the server
app.listen(4500, () => {
  console.log('Server is running on port 4500');
});