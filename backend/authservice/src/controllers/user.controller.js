import { findUserById } from "../services/auth.services.js";
const getUserDetailsController = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming the user ID is stored in the token payload

    // Implement your logic to fetch user details from the database using the userId
    const userDetails = await findUserById(userId); // You need to implement this function in your service layer

    if (!userDetails) {
      return res.status(404).json({
        status: "User not found",
      });
    }

    res.status(200).json({
      status: "User details fetched successfully!",
      user: userDetails
    });

  } catch (error) {
    console.error("Error in getUserDetailsController:", error);
    res.status(500).json({
      status: "Error fetching user details",
      error: error.message,
    });
  }
};

export { getUserDetailsController };