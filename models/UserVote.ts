import mongoose, { Document, Schema } from "mongoose";

interface UserVote extends Document {
  promptId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  //   vote: {
  //     [candidate: string]: "upvote" | "downvote" | "repost";
  //   };
}

const UserVoteSchema = new Schema<UserVote>({
  promptId: { type: Schema.Types.ObjectId, ref: "VotePrompt", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  //   vote: { type: Schema.Types.Mixed, default: {} },
});

const UserVoteModel = mongoose.model<UserVote>("UserVote", UserVoteSchema);

export default UserVoteModel;
