const Listing = require('../Models/Listing')
const mongoose = require('mongoose');

//get all
const allListings = async(req,res)=>{
    try{
        const listings = await Listing.find({});
        res.status(200).json(listings)
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
};

//get single by id
const getListing = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(listing);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching listing", error: err.message });
  }
};


//create listing
const createListing = async (req, res) => {
  try {
    const { title, images, description, price, location, country } = req.body;

    if (!title || !images || !description || !price || !location || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ message: "Images must be a non-empty array" });
    }

    for (const img of images) {
      if (!img.url || !img.public_id) {
        return res
          .status(400)
          .json({ message: "Each image must contain url and public_id" });
      }
    }

    const newListing = await Listing.create({
      title,
      images,
      description,
      price,
      location,
      country,
    });

    res.status(201).json(newListing);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating listing", error: err.message });
  }
};

//update listing
const updateListing = async (req, res) => {
  try {
    const { title, images, description, price, location, country } = req.body;

    if (!title || !images || !description || !price || !location || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!Array.isArray(images) || images.length === 0) {
      return res
        .status(400)
        .json({ message: "Images must be a non-empty array" });
    }

    for (const img of images) {
      if (!img.url || !img.public_id) {
        return res
          .status(400)
          .json({ message: "Each image must contain url and public_id" });
      }
    }

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const updatedListing = await Listing.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { title, images, description, price, location, country },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json(updatedListing);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating listing", error: err.message });
  }
};

const deleteListing = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid listing ID" });
    }

    const listing = await Listing.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    allListings,
    getListing,
    createListing,
    updateListing,
    deleteListing
};