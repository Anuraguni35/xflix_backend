const express=require('express');
const router=express.Router();
const controllers=require('../controllers/index.controllers');
const {verifyBody,verifyVideoId} =require('../middleware/validate')
 

router.get('/videos/:videoId', controllers.getVideosById)
router.get('/videos',controllers.getVideos);
router.post('/videos',verifyBody,controllers.postNewVideo);
router.patch('/videos/:videoId/votes',controllers.updateVote);
router.patch('/videos/:videoId/views', verifyVideoId, controllers.updateViews)
module.exports=router;
