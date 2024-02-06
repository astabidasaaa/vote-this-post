import mongoose, { Document, Schema, Types } from "mongoose";

interface Post {
  username: string;
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
  },
  voter: [String],
});

const PostSchema = new Schema<Post>(
  {
    username: {
      type: String,
      // required: true,
    },
    postBody: {
      type: String,
      // required: true,
      minlength: 1,
      maxlength: 280,
    },
    candidates: { type: [CandidateSchema], required: true },
    upVotes: [String],
    downVotes: [String],
    saves: [String],
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
