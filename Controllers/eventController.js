import Beautician from "../Models/beauticianSchema.js";
import Entertainer from "../Models/entertainerSchema.js";
import Event from "../Models/eventSchema.js";
import EventStylist from "../Models/eventStylistSchema.js";
import Photographer from "../Models/photographerSchema.js";
import Transport from "../Models/transportSchema.js";

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
    //console.log(id);

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
    //console.log(id);

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

// photography

// create

export const createPhotographer = async (req, res) => {
  try {
    const photographer = new Photographer(req.body);
    await photographer.save();
    res.status(200).json({
      message: "Photographer created successfully",
      result: photographer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "photographer created failed due to internal server error",
    });
  }
};

// get

export const getAllPhotographers = async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.status(200).json({
      message: "photographers fetched successfully",
      result: photographers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "photographers failed to fetch due to internal server error",
    });
  }
};

// entertainer

//create

export const createEntertainer = async (req, res) => {
  const { name, imgUrl, options } = req.body;

  try {
    const entertainer = new Entertainer({ name, imgUrl, options });
    await entertainer.save();
    res.status(200).json({
      message: "Entertainer created successfully",
      result: entertainer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Entertainer created failed due to an internal server error",
    });
  }
};

// get

export const getAllEntertainer = async (req, res) => {
  try {
    const entertainer = await Entertainer.find();
    res.status(200).json({
      message: "entertainer fetched successfully",
      result: entertainer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "entertainer fetched failed due to an internal server error",
    });
  }
};

// beautician

// create

export const createBeautician = async (req, res) => {
  const { name, imgUrl, services } = req.body;
  try {
    const beautician = new Beautician({ name, imgUrl, services });
    await beautician.save();
    res
      .status(200)
      .json({ message: "Beautician created successfully", result: beautician });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Beautician created failed due to an internal server error",
    });
  }
};

// get

export const getAllBeautician = async (req, res) => {
  try {
    const beauticians = await Beautician.find();
    res.status(200).json({
      message: "Beautician fetched successfully",
      result: beauticians,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Beautician fetch failed due to an internal server error",
    });
  }
};

// event stylist

// create

export const createEventStylist = async (req, res) => {
  const { name, imgUrl, services } = req.body;

  try {
    const eventStylist = new EventStylist({ name, imgUrl, services });
    await eventStylist.save();
    res.status(200).json({
      message: "event stylist created successfully",
      result: eventStylist,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "event stylist created failed due to an internal server error",
    });
  }
};

// get

export const getAllStylist = async (req, res) => {
  try {
    const eventStylists = await EventStylist.find();
    res
      .status(200)
      .json({ message: "event stylist fetch success", result: eventStylists });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "event stylist fetch failed due to an internal server error",
    });
  }
};

// transport

// create

export const createTransport = async (req, res) => {
  const { name, imgUrl, options } = req.body;

  try {
    const transport = new Transport({ name, imgUrl, options });
    await transport.save();
    res.status(200).json({
      message: "Transport created successfully",
      result: transport,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Transport creation failed due to an internal server error",
    });
  }
};

// get

export const getAllTransports = async (req, res) => {
  try {
    const transports = await Transport.find();
    res
      .status(200)
      .json({ message: "Tranport fetched successfully", result: transports });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch transports due to an internal server error",
    });
  }
};
