// models/Vote.ts
import mongoose, { Document, Schema } from "mongoose";

// interface IVote extends Document {
//   candidate: string;
//   votes: number;
// }

const voteSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      default: "",
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: String,
      enum: ["upvote", "downvote"],
      required: true,
    },
  },
  { timestamps: true }
);

const VoteModel = mongoose.models.Vote || mongoose.model("Vote", voteSchema);

export default VoteModel;

// timestamps: {
//   type: Date,
//   default: Date.now,
// },
// rating: {
//   type: String,
//   enum: ["upvote", "downvote"],
//   required: true,
// },
