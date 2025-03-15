const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./db/db");
const User = require("./db/UserSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Application = require("./db/applicationform");
const ApplicationTableSchema = require("./db/ApplicationTableSchema");

const authenticateToken = require("./middleware/auth");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Corrected CORS origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Optional: Allow cookies/tokens
  })
);

// JWT Secret Key
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  console.error("FATAL ERROR: JWT_SECRET_KEY is not defined.");
  process.exit(1);
}

// User Registration
app.post("/create", async (req, res) => {
  const {
    fullName,
    gender,
    father_name,
    dob,
    email,
    password,
    phone,
    marital_status, // ✅ CHANGED FROM Boolean to String
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
      father_name,
      dob,
      email,
      password: hashedPassword,
      phone,
      marital_status, // ✅ CHANGED FROM Boolean to String
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
    res.status(500).json({ message: "Failed to register user" });
  }
});

// ============================
// Update User Profile Route
// ============================
app.put("/user-profile-update/:email", async (req, res) => {
  const email = req.params.email;
  const updatedData = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ Loop over each field, if field value is not empty, update it
    for (let key in updatedData) {
      if (updatedData[key] && updatedData[key].trim() !== "") {
        user[key] = updatedData[key]; // Update only non-empty fields
      }
    }

    await user.save(); // Save updated user

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ============================
// Get User Data by Email Route
// ============================
app.get("/user-profile/api/data/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await User.findOne({ email: email });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(data);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================
// User Login Route
// ============================
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

    const payload = {
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      aadharCard: user.aadharCard,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        aadharCard: user.aadharCard,
      },
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// ============================
// Application Form Submission (Protected Route)
// ============================
app.post("/api/applications", async (req, res) => {
  try {
    const applicationData = req.body;

    const appID = "APP-" + Date.now(); // ✅ Unique Application ID

    // Merge applicationID with applicationData
    const newApplication = new Application({
      ...applicationData, // spreading all user data
      applicationID: appID, // ✅ adding generated Application ID
      status: "Pending", // ✅ Default status set to Pending
    });

    // Save in MongoDB
    const savedApplication = await newApplication.save();

    res.status(201).json({
      message: "Application received successfully.",
      application: savedApplication,
    });
  } catch (error) {
    console.error("Error saving application:", error);
    res.status(500).json({
      message: "Error saving application",
      error: error.message,
    });
  }
});

app.post("/dashboard", async (req, res) => {
  try {
    const { name, startDate, endDate, status, comments } = req.body;

    // Validate required fields
    if (!name || !startDate || !endDate || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Auto-generate Application ID
    const applicationID = "APP-" + Date.now();

    const newApp = new ApplicationTableSchema({
      name,
      startDate,
      endDate,
      status,
      comments,
      applicationID,
    });
    console.log(newApp);
    const savedApp = await newApp.save();
    res.status(201).json(savedApp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/dashboard/counts", async (req, res) => {
  try {
    const totalApplications = await ApplicationTableSchema.countDocuments(); // ✅ All applications
    const pendingApplications = await ApplicationTableSchema.countDocuments({
      status: "Pending",
    }); // ✅ Pending applications
    const approvedApplications = await ApplicationTableSchema.countDocuments({
      status: "Approved",
    });
    const rejectedApplications = await ApplicationTableSchema.countDocuments({
      status: "Rejected",
    });

    res.json({
      total: totalApplications,
      pending: pendingApplications,
      approved: approvedApplications,
      rejected: rejectedApplications,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// ============================
// Server Listen
// ============================
const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
