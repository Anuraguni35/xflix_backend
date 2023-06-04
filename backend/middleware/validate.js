const {Bodyvalidation,VideoIdValidation}=require('../validators/video.validator') 
 
// const httpStatus=require('http-status');

const verifyBody=(req,res,next)=>{
  let result=Bodyvalidation.validate(req.body);
  if(result.error){
   res.status(400).json({message:result.error.details})
  }else{
 next();
  }
}

const verifyVideoId=(req,res,next)=>{
 
  let result= VideoIdValidation.validate(req.params);
  if(result.error){
   res.status(400).json({message:result.error.details})
  }else{
 next();
  }
}

module.exports = {verifyBody,verifyVideoId};
