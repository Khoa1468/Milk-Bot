import mongoose from "mongoose";

const warnSchemas = new mongoose.Schema({
  guildID: {
    type: String,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  warnings: {
    type: [Object],
    required: true,
  },
});

export = mongoose.model("warnings", warnSchemas);
