import mongoose from "mongoose";
const postschema = mongoose.Schema(
  {
    userid: {
      type: mongoose.Types.ObjectId,
      ref:'User',
      required: true,
    },
    description: String,
   
  },
  { timestamps: true }
);

const Post = mongoose.model("post", postschema);
export default Post;