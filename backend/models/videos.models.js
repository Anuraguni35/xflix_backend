const mongoose = require("mongoose");
const validator = require("validator");

const videoSchema = mongoose.Schema({
  videoLink: {
    type: String,
    required: [true, "Youtube video link is required."],
    unique: true,
    trim: true,
    // validate(value) {
    //     if (!validator.isURL(value, { protocols: ['http', 'https'], host_whitelist: ['www.youtube.com'] })) {
    //       throw new Error('Invalid YouTube link');
    //     }
    // },
  },
  title: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
    enum: ["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"],
  },
  contentRating: {
    type: String,
    required: true,
    enum: ["Anyone", "7+", "12+", "16+", "18+"],
  },
  releaseDate: {
    type: String,
    required: true,
  },
  previewImage: {
    type: String,
    required: true,
  },
  votes: {
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  },
  viewCount: {
    type: Number,
    default: 0,
  },
});

const videos = mongoose.model("videos", videoSchema);

module.exports = { videos };
