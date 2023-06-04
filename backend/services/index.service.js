const {videos}=require('../models/videos.models');
 
const httpStatus=require('http-status')

const getAllVideos=async()=>{
    const result=await videos.find({});
    
    return result;
}

const getVideosByFilter=async(title,genre,contentRating,sortBy)=>{
 
  const titleMatch = { title: { $regex: title, $options: "i" } };
  let contentRatingArr=getPossibleContentRating(contentRating);
  const contentRatingM={contentRating:{$in:contentRatingArr}};
   
  let genreMatchArr=genreMatch(genre);
  const genreM={genre:{$in:genreMatchArr}}
  console.log(contentRatingM);
  const getVideoFromDB=await videos.find({...titleMatch,...contentRatingM,...genreM });
  // console.log(getVideoFromDB);

  const result=sortVideosByFilter(getVideoFromDB,sortBy);
  // console.log(result);
  return result;
}

const getPossibleContentRating=(contentRating)=>{
  // console.log(contentRating);
  if(contentRating[0]==="All"){
    console.log(contentRating);
    return ["Anyone", "7+", "12+", "16+", "18+"];
  }else{
    
    return [contentRating];
  }
}

const genreMatch=(genre)=>{
  if(genre==="All"){
    return ["Education", "Sports", "Movies", "Comedy", "Lifestyle"];
  }else{
   return genre.split(",");
  }
}

const sortVideosByFilter=(videos,sortBy)=>{
 if(videos.length!==0&&sortBy=="releaseDate"){
  let result=videos.sort((a,b)=>{return   new Date(b.releaseDate)-new Date(a.releaseDate) ;})
  return result;
 }else if(videos.length!==0){
  let result=videos.sort((a,b)=>{return b.viewCount-a.viewCount});
  return result;
 }else{
  return videos;
 }
}


const getVideoById=async(id)=>{ 
const video=await videos.findById(id);
 return video;
}

const createVideo = async(details) => {
 const newVideo=new videos(details);
 const result=await newVideo.save();
 return result;
}

 


const updateVote = async (videoId, body) => {
  // console.log(videoId)
    const video = await videos.findOne({ _id: videoId });
  
    if (body.vote === 'upVote') {
      if (body.change === 'increase') {
        video.votes.upVotes += 1;
      } else if (body.change === 'decrease') {
        video.votes.upVotes -= 1;
      }
    } else if (body.vote === 'downVote') {
      if (body.change === 'increase') {
        video.votes.downVotes += 1;
      } else if (body.change === 'decrease') {
        video.votes.downVotes -= 1;
      }
    }
  
    console.log('video', video);
  
    const result = await video.save();
    console.log("result",result);
  
    return result;
  };


  const updateViews=async(videoId)=>{
    console.log(videoId)
    const video = await videos.findOne({ _id: videoId });
  video.viewCount+=1;
  // console.log(video)
  const result=await video.save();
  console.log(result);
  return result;
  }
module.exports={getAllVideos,getVideosByFilter,getVideoById,createVideo,updateVote,updateViews}