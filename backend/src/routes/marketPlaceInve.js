const Router = require("express");
const inventryRoute = Router();
const inventryData = require("../models/MarketplaceInventoryModel");
const oemSpecdata = require("../models/oemModel");

inventryRoute.post("/addInventry/:model_id", async (req, res) => {
  try {
    const { model_id } = req.params;
    const {
      image,
      title,
      bullet_points,
      odometer_km,
      major_scratches,
      original_paint,
      accidents_reported,
      previous_buyers,
      registration_place,
    } = req.body;
//   console.log(req.body, model_id)
    const oemSpec = await oemSpecdata.findById(model_id);
    if (!oemSpec) {
      return res.status(404).json({ message: "OEM model not found" });
    }
    // if (
    //     !image ||
    //     !title ||
    //     !bullet_points ||
    //     bullet_points.length !== 5 ||
    //     !odometer_km ||
    //     !major_scratches ||
    //     !original_paint ||
    //     !accidents_reported ||
    //     !previous_buyers ||
    //     !registration_place
    // ) {
    //     // console.log(image,title,bullet_points, odometer_km, major_scratches, original_paint, accidents_reported,previous_buyers, registration_place )
    //   return res.status(400).send({ message: "Please fill required data" });
    // }
    const newItem = new inventryData({
      model_id,
      image,
      title,
      bullet_points,
      odometer_km,
      major_scratches,
      original_paint,
      accidents_reported,
      previous_buyers,
      registration_place,
    });
    const savedItem = await newItem.save();
    return res
      .status(201)
      .send({ message: "Inventry data save add successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = inventryRoute;
