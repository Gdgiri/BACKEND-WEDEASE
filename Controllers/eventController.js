import Event from "../Models/eventSchema.js";

// create

export const eventCreate = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();

    res
      .status(200)
      .json({ message: "event created successfully", result: newEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "event creation failed due to an internal server error",
    });
  }
};

// getAll

export const fetchEvent = async (req, res) => {
  try {
    const getEvent = await Event.find();
    res
      .status(200)
      .json({ message: "events fetch successfully", result: getEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "event data fetch failure due to an internal server error",
    });
  }
};
