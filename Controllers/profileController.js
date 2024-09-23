import Profile from "../Models/profileSchema.js";

// create

export const createProfile = async (req, res) => {
  try {
    const newProfile = new Profile(req.body);
    console.log(newProfile);

    await newProfile.save();
    res
      .status(200)
      .json({ message: "Profile created successfully", result: newProfile });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "profile Creation failed due to internal server error",
    });
  }
};
