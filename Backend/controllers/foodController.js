import foodModel from "../models/foodModel.js";
import fs from "fs";

// ✅ ADD FOOD
const addFood = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({
        success: false,
        message: "Image file is missing",
      });
    }

    const image_filename = req.file.filename;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });

  } catch (error) {
    console.log("ADD FOOD ERROR:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ LIST FOOD
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log("LIST FOOD ERROR:", error);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ REMOVE FOOD
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.json({
        success: false,
        message: "Food not found",
      });
    }

    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("REMOVE FOOD ERROR:", error);
    res.json({ success: false, message: "Error" });
  }
};

// ✅ EXPORTS (NOW ALL ARE DEFINED)
export { addFood, listFood, removeFood };
