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
      .json({ message: "event's fetch successfully", result: getEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "event data's fetch failure due to an internal server error",
    });
  }
};

// getbyid

export const fetchId = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event fetched ", result: event });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ messaeg: "fetch data is failed due to internal server error" });
  }
};

// update

export const updateEvent = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const modifyEvent = await Event.findByIdAndUpdate(
      id,
      {
        venueImg: req.body.venueImg,
        venueName: req.body.venueName,
        venuePlace: req.body.venuePlace,
        venueAmount: req.body.venueAmount,
        cateringName: req.body.cateringName,
        cateringAmount: req.body.cateringAmount,
        photographerName: req.body.photographerName,
        photographerAmount: req.body.photographerAmount,
        eventStylistName: req.body.eventStylistName,
        eventStylistAmount: req.body.eventStylistAmount,
        entertainerName: req.body.entertainerName,
        entertainerAmount: req.body.entertainerAmount,
        beauticianName: req.body.beauticianName,
        beauticianAmount: req.body.beauticianAmount,
        transportName: req.body.transportName,
        transportAmount: req.body.transportAmount,
      },
      { new: true, runValidators: true }
    );

    if (!modifyEvent) {
      return res.status(404).json({ message: "event not found" });
    }
    res
      .status(200)
      .json({ message: "event updated successfully", result: modifyEvent });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "events update failure due to internal server error" });
  }
};

// delete

export const deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const removeEvent = await Event.findByIdAndDelete(id);

    if (!removeEvent) {
      return res.status(404).json({ message: "event not found" });
    }
    res
      .status(200)
      .json({ message: "event deleted successfully", result: removeEvent });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "event data failed to delete due to internal server error",
    });
  }
};
