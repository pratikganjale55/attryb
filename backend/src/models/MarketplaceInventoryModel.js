const mongoose = require('mongoose');
mongoose.set("strictQuery", true); 

const MarketplaceInventorySchema = new mongoose.Schema({
  model_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OEMSpecs', required: true },
  odometer_km: { type: Number, required: true },
  major_scratches: { type: Boolean, required: true },
  original_paint: { type: Boolean, required: true },
  accidents_reported: { type: Number, required: true },
  previous_buyers: { type: Number, required: true },
  registration_place: { type: String, required: true },
});

const MarketplaceInventory = mongoose.model('MarketplaceInventory', MarketplaceInventorySchema);

module.exports = MarketplaceInventory;