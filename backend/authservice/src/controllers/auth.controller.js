import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt';
import { findUserByEmail, createUser } from '../services/auth.services.js';
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

export { RegisterController };