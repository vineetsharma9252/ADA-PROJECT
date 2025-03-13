const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const connectDB = require('./db/db');
const User = require('./db/UserSchema');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Application = require('./db/applicationform');
const authenticateToken = require('./middleware/auth');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "htts://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JWT Secret Key
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  console.error("FATAL ERROR: JWT_SECRET_KEY is not defined.");
  process.exit(1);
}

// User Registration
app.post("/user-profile", async (req, res) => {
  console.log(req.body);
  const {
    fullName,
    gender,
    dob,
    father_name,
    email,
    password,
    phone,
    marital_status,
    caste,
    curr_address,
    perm_address,
    aadharCard,
    panCard,
    voterId,
    occupation,
    income,
    education,
    disability,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      gender,
      dob,
      father_name,
      email,
      password: hashedPassword,
      phone,
      marital_status,
      caste,
      curr_address,
      perm_address,
      aadharCard,
      panCard,
      voterId,
      occupation,
      income,
      education,
      disability,
    });

    await newUser.save();

    const payload = { fullName, email };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
});

// API Route to fetch data
app.get("/user-profile/api/data/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await User.findOne({ email: email });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
      return res
        .status(401)
        .json({ message: "Invalid email or user not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const payload = { email: user.email, fullName: user.fullName };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, fullName: user.fullName },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

app.post('/api/applications', authenticateToken ,async (req, res) => {
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
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
