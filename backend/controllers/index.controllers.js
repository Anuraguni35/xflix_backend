const services = require("../services/index.service");
const httpStatus = require("http-status");

const getVideos = async (req, res) => {
  // console.log('test')
  if (
    req.query.title ||
    req.query.genres ||
    req.query.contentRating ||
    req.query.sortBy
  ) {
    const { title, genres, contentRating, sortBy } = req.query;
    const title1 = title ? title : "";
    const genres1 = genres ? genres : "All";
    const contentRating1 = contentRating ? contentRating : ["All"];
    const sortBy1 = sortBy ? sortBy : "releaseDate";
    const result = await services.getVideosByFilter(
      title1,
      genres1,
      contentRating1,
      sortBy1
    );
   
    res.status(httpStatus.OK).json({ videos: result });
  } else {
   
    const videos = await services.getAllVideos();
    const count = videos.length;
     console.log(count);
    res.status(httpStatus.OK).json({ videos });
  }
};

const getVideosById = async (req, res) => {
  const video = await services.getVideoById(req.params.videoId);
  if (!video) {
    res
      .status(httpStatus.NOT_FOUND)
      .json({
        code: httpStatus.NOT_FOUND,
        message: "No video found with matching id",
      });
  } else {
    res.status(httpStatus.OK).json(video);
  }
};

const postNewVideo = async (req, res) => {
  try {
    const newVideo = await services.createVideo(req.body);
    res.status(httpStatus.CREATED).json(newVideo);
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json({ code: 400, message: err.message });
  }
};

const updateVote = async (req, res) => {
  try {
    const updateVote = await services.updateVote(req.params.videoId, req.body);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: "no videos found with iD" });
  }
};

const updateViews = async (req, res) => {
  try {
    const updateViews = await services.updateViews(req.params.videoId);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: "no videos found with iD" });
  }
};
module.exports = {
  getVideos,
  getVideosById,
  postNewVideo,
  updateVote,
  updateViews,
};
