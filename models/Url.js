import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema({
  unique: String,
  url: String,
  clicked: Number,
  timestamp: Date,
});

const Url = mongoose.models.Url || mongoose.model("Url", urlSchema);

export default Url;