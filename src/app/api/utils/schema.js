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
  turn: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  puzzle: {
    type: Array,
    default: [1, 2, 3, 4, 5],
  },
  debug: {
    type: Array,
    default: [1, 2, 3, 4, 5],
  },
  code: {
    type: Array,
    default: [1, 2, 3, 4, 5],
  },
});

const CodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
const Access_code = mongoose.models.Access_code || mongoose.model("Access_code", CodeSchema);

export { Room, Access_code };
