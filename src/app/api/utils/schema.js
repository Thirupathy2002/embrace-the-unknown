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

const AccessCodeSchema = mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const CodingQuestionSchema = mongoose.Schema({
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

const PuzzleQuestionSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema);
const Access_code = mongoose.models.Access_code || mongoose.model("Access_code", AccessCodeSchema);
const Coding_questions =
  mongoose.models.Coding_questions || mongoose.model("Coding_questions", CodingQuestionSchema);
const Puzzle_questions =
  mongoose.models.Puzzle_questions || mongoose.model("Puzzle_questions", PuzzleQuestionSchema);

export { Room, Access_code, Coding_questions, Puzzle_questions };
