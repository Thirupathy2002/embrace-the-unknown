import mongoose from "mongoose";

const RoomSchema = mongoose.Schema({
  id: {
    type: String,
    length: 6,
    required: true,
    unique: true,
  },
  step: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);

export { Room };
