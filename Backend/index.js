const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const express = require("express");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const connectDB = require("./db/db");
const User = require("./db/UserSchema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Application = require("./db/applicationform");
const ApplicationTableSchema = require("./db/ApplicationTableSchema");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PasswordResetToken = require("./db/PasswordResetToken");
const validator = require("validator"); // For input validation/sanitization
const authenticateToken = require("./middleware/auth");

const app = express();
const secretkey = "6LerCfYqAAAAAHMOQ8xQF1xHs7Lx3_udMXyEUOpQ";

// const applicationID = "APP-" + Date.now();
// const applicationID = "APP-" + uuidv4();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Corrected CORS origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Optional: Allow cookies/tokens
  })
);
app.use(bodyParser.json());

// JWT Secret Key
const SECRET_KEY = process.env.JWT_SECRET_KEY;
if (!SECRET_KEY) {
  console.error("FATAL ERROR: JWT_SECRET_KEY is not defined.");
  process.exit(1);
}
// Email sender setup (use Brevo/SMTP here)
const transporter = nodemailer.createTransport({
  service: "gmail", // Or use your custom SMTP like Brevo
  auth: {
    user: process.env.EMAIL_USER, // ✅ Change to your email
    pass: process.env.EMAIL_PASS, // ✅ App password
  },
});


// User Registration
app.post("/create", async (req, res) => {
  console.log(req.body);

  const {
    captchaToken,
    fullName,
    gender,
    father_name,
    dob,
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
    // --------------------------------------
    // ✅ 1. Input Validation and Sanitization
    // --------------------------------------
    if (
      !captchaToken ||
      !validator.isEmail(email) ||
      !validator.isStrongPassword(password, {
        minLength: 8,
        minNumbers: 1,
        minUppercase: 1,
        minSymbols: 1,
      })
    ) {
      return res
        .status(400)
        .json({ message: "Invalid input data or weak password" });
    }

    // Optional: Additional checks (example: Aadhar must be 12 digits)
    if (
      !validator.isLength(aadharCard, { min: 12, max: 12 }) ||
      !validator.isNumeric(aadharCard)
    ) {
      return res.status(400).json({ message: "Invalid Aadhar number" });
    }

    // --------------------------------------
    // ✅ 2. Verify CAPTCHA
    // --------------------------------------
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${captchaToken}`;
    const captchaResponse = await axios.post(verificationUrl);

    if (!captchaResponse.data.success) {
      return res.status(400).json({ message: "CAPTCHA verification failed" });
    }

    // --------------------------------------
    // ✅ 3. Check if user already exists
    // --------------------------------------
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // --------------------------------------
    // ✅ 4. Password Hashing with Salt (stronger)
    // --------------------------------------
    const saltRounds = 12; // Increase salt rounds for better security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // --------------------------------------
    // ✅ 5. Create User Document (Sanitize all fields)
    // --------------------------------------
    const newUser = new User({
      fullName: validator.escape(fullName.trim()),
      gender: validator.escape(gender.trim()),
      father_name: validator.escape(father_name.trim()),
      dob,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: validator.escape(phone.trim()),
      marital_status: validator.escape(marital_status.trim()),
      caste: validator.escape(caste.trim()),
      curr_address: validator.escape(curr_address.trim()),
      perm_address: validator.escape(perm_address.trim()),
      aadharCard: validator.escape(aadharCard.trim()),
      panCard: validator.escape(panCard.trim()),
      voterId: validator.escape(voterId.trim()),
      occupation: validator.escape(occupation.trim()),
      income: validator.escape(income.trim()),
      education: validator.escape(education.trim()),
      disability: validator.escape(disability.trim()),
    });

    // --------------------------------------
    // ✅ 6. Save to Database
    // --------------------------------------
    await newUser.save();

    // --------------------------------------
    // ✅ 7. JWT Token Generation (Bearer Token Pattern)
    // --------------------------------------
    const payload = {
      userId: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      phone: newUser.phone,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // --------------------------------------
    // ✅ 8. Send Token in HTTP-Only Cookie (Optional but Recommended)
    // --------------------------------------
    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true, // Cannot be accessed by JavaScript
        secure: true, // Send only over HTTPS
        sameSite: "Strict", // CSRF protection
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({
        message: "User registered successfully",
        token: `Bearer ${token}`, // Token for frontend usage
      });
  } catch (error) {
    console.error("Error during registration:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
});

// ============================
// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or user not found" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Prepare JWT payload
    const payload = {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    };

    // Generate JWT Token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    // Set JWT in HttpOnly Secure Cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 60 * 60 * 1000,
    });

    // Send success response WITHOUT token in body
    res.status(200).json({
      message: "Login successful",
      user: {
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Login failed", error: error.message });
  }
});

// ✅ Forgot password route
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiry

    // Optional: Remove old token if any
    await PasswordResetToken.deleteMany({ email });

    // Store token in DB
    await PasswordResetToken.create({
      email,
      token,
      expiresAt,
    });

    // Send reset link via email
    const resetLink = `http://localhost:3000/reset-password?token=${token}`; // Frontend reset link

    await transporter.sendMail({
      from: "m74006696@gmail.com", // ✅ Your email
      to: email,
      subject: "Password Reset Link",
      html: `<p>Click here to reset your password: <a href="${resetLink}">Reset Password</a></p>
             <p>This link is valid for 1 hour only.</p>`,
    });

    res.json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.error("Error in forgot-password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/reset-password", async (req, res) => {
  const { token, password } = req.body;


  const resetToken = await PasswordResetToken.findOne({ token });

  if (!resetToken || resetToken.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Step 2: Password hash karo
  const hashedPassword = await bcrypt.hash(password, 10);

  // Step 3: User ka password update karo
  await User.updateOne(
    { email: resetToken.email },
    { $set: { password: hashedPassword } }
  );

  // Step 4: Token delete karo (use once only)
  await PasswordResetToken.deleteOne({ token });

  res.json({ message: "Password reset successful" });
});




app.get("/api/auth/check", authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
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
// Application Form Submission (Protected Route)
// ============================
// app.post("/api/applications", async (req, res) => {
//   try {
//     const applicationData = req.body;

//     const appID = applicationID; // ✅ Unique Application ID

//     // Merge applicationID with applicationData
//     const newApplication = new Application({
//       ...applicationData, // spreading all user data
//       applicationID: appID, // ✅ adding generated Application ID
//       status: "Pending", // ✅ Default status set to Pending
//     });

//     console.log(newApplication);
//     // Save in MongoDB
//     const savedApplication = await newApplication.save();

//     res.status(201).json({
//       message: "Application received successfully.",
//       application: savedApplication,
//     });
//   } catch (error) {
//     console.error("Error saving application:", error);
//     res.status(500).json({
//       message: "Error saving application",
//       error: error.message,
//     });
//   }
// });

// app.get("/dashboard/applicationData/:email", async (req, res) => {
//   try {
//     const userEmail = req.params.email;
//     const applicationData = await ApplicationSchema.find({ email: userEmail });

//     if (!applicationData) {
//       return res
//         .status(404)
//         .json({ message: "No applications found for this user" });
//     }
//     console.log("applicationData " + applicationData);
//     const response = applicationData.map((app) => ({
//       name: app.applicationID,
//       startDate: app.startDate,
//       endDate: app.endDate,
//       status: app.status,
//     }));

//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching application data:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// });

// app.get("/dashboard/:email", async (req, res) => {
//   try {
//     // 👇 Get the user's email from the query parameters
//     const userEmail = req.params.email;
//     // Check if email is provided
//     if (!userEmail) {
//       return res.status(400).json({ message: "Email is required" });
//     }
//     console.log(userEmail);
//     // Fetch counts for the user's applications
//     const totalApplications = await ApplicationSchema.countDocuments({
//       email: userEmail,
//     }); // ✅ All applications for the user

//     const pendingApplications = await ApplicationSchema.countDocuments({
//       email: userEmail,
//       status: "Pending",
//     }); // ✅ Pending applications for the user

//     const approvedApplications = await ApplicationSchema.countDocuments({
//       email: userEmail,
//       status: "Approved",
//     });

//     const rejectedApplications = await ApplicationSchema.countDocuments({
//       email: userEmail,
//       status: "Rejected",
//     });

//     // Log the counts for debugging
//     console.log({
//       total: totalApplications,
//       pending: pendingApplications,
//       approved: approvedApplications,
//       rejected: rejectedApplications,
//     });

//     // Send the response
//     res.json({
//       total: totalApplications,
//       pending: pendingApplications,
//       approved: approvedApplications,
//       rejected: rejectedApplications,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server Error" });
//   }
// });


// app.post("/create", async (req, res) => {
//   const { captchaToken, ...formData } = req.body;

//   // Verify CAPTCHA
//   const secretKey = process.env.CAP_SECRET_KEY;
//   const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

//   try {
//     const response = await axios.post(verificationUrl);
//     if (!response.data.success) {
//       return res.status(400).json({ message: "CAPTCHA verification failed" });
//     }

//     // Proceed with form submission
//     // Your existing logic for saving form data
//   } catch (error) {
//     console.error("Error verifying CAPTCHA:", error);
//     res.status(500).json({ message: "Failed to verify CAPTCHA" });
//   }
// });

// ============================
// Server Listen
// ============================




const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
