import mongoose, { Document, Schema, Types } from "mongoose";

interface Post {
  userId: string;
  username: string;
  postId: number;
  postBody: string;
  candidates: Candidate[];
  upVotes: string[];
  downVotes: string[];
  saves: string[];
}

interface Candidate {
  candidateBody: string;
  voter: string[];
}

const CandidateSchema = new Schema<Candidate>({
  candidateBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32,
  },
  voter: { type: [String], default: [] },
});

const PostSchema = new Schema<Post>(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    postId: { type: Number, unique: true },
    postBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    candidates: { type: [CandidateSchema], required: true },
    upVotes: { type: [String], default: [] },
    downVotes: { type: [String], default: [] },
    saves: { type: [String], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// const VotePromptModel = mongoose.model<VotePrompt>(
//   "VotePrompt",
//   VotePromptSchema
// );

CandidateSchema.virtual("voterCount").get(function () {
  return this.voter.length;
});

PostSchema.virtual("totalVoters").get(function () {
  let result = 0;

  this.candidates.map((candidate, index) => {
    result += candidate.voter.length;
  });

  return result;
});

export default mongoose.models.Post || mongoose.model<Post>("Post", PostSchema);
