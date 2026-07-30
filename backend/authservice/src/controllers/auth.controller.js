import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser, findUserById } from '../services/auth.services.js';
import jsonwebtoken from 'jsonwebtoken';

const RegisterController = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "Validation failed",
        errors: errors.array(),
      });
    }

    const { username, email, password, user_details } = req.body;
    const rawUserDetails = typeof user_details === 'object' && user_details !== null && !Array.isArray(user_details)
      ? user_details
      : {};

    const {
      first_name: firstName,
      firstname: firstNameAlias,
      firstName: firstNameCamel,
      last_name: lastName,
      lastname: lastNameAlias,
      lastName: lastNameCamel,
      role,
      is_verified,
      ...restDetails
    } = rawUserDetails;

    const safeUserDetails = {
      role: role || "CUSTOMER",
      is_verified: is_verified ?? false,
      first_name: firstName ?? firstNameAlias ?? firstNameCamel ?? "",
      last_name: lastName ?? lastNameAlias ?? lastNameCamel ?? "",
      ...restDetails,
    };

    const hashedPassword = await bcrypt.hash(password, 12); // Hash the password with a salt round of 12

    if (!hashedPassword) {
      return res.status(500).json({
        status: "Error hashing password",
      });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        status: "User already exists with this email",
      });
    }

    const newUser = await createUser(username, email, hashedPassword, safeUserDetails);

    if (!newUser) {
      return res.status(500).json({
        status: "Error creating user",
      });
    }
    // Implement your registration logic here
    res.status(200).json({
      status: "User registered successfully!",
      user: newUser
    });
  } catch (error) {
    console.error("Error in RegisterController:", error);
    res.status(500).json({
      status: "Error registering user",
      error: error.message,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({
        status: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({
        status: "Invalid password",
      });
    }
    // Generate JWT token
    const token = jsonwebtoken.sign(
      { userId: user.id, email: user.email, role: user.user_details.role },
      process.env.JWT_SECRET || 'your_jwt_secret', // Use a secure secret in production
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({
      status: "Login successful!",
      token: token
    });

  } catch (error) {
    console.error("Error in LoginController:", error);
    res.status(500).json({
      status: "Error logging in user",
      error: error.message,
    });
  }
};

export { RegisterController, LoginController };