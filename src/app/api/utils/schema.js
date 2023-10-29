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

const QuestionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  template: {
    javascript: {
      type: String,
      required: true,
    },
    c: {
      type: String,
      required: true,
    },
    python: {
      type: String,
      required: true,
    },
    java: {
      type: String,
      required: true,
    },
  },
  test_cases: {
    type: Array,
    required: true,
  },
  check_fn: {
    type: String,
    required: true,
  },
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
const Access_code = mongoose.models.Access_code || mongoose.model("Access_code", CodeSchema);
const Coding_questions =
  mongoose.models.Coding_questions || mongoose.model("Coding_questions", QuestionSchema);

export { Room, Access_code, Coding_questions };
