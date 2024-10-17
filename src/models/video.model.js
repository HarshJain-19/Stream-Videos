import mongoose, { Schema } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";

export const videoSchema = new Schema({
  videoFile: {
    type: String,       //& cloudinary url
    required: true,
  },
  thumbnail: {
    type: String,       //& cloudinary url
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxLength: 50, 
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,       //& get from cloudinary
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
}, { timestamps: true });

//* plugin for aggregate pipeline
videoSchema.plugin(aggregatePaginate);

const Video = mongoose.model("Video", videoSchema);

export default Video;


