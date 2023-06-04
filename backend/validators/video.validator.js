const { required } = require("joi");
const Joi = require("joi");
 



const Bodyvalidation = Joi.object().keys({
    videoLink:Joi.string().required().regex(/^https?:\/\/(?:www\.)?youtube\.com\/embed\/?([a-zA-Z0-9-_]+)$/),
    title:Joi.string().required(),
    genre:Joi.string().required().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All" ),
    contentRating:Joi.string().required().allow("Anyone", "7+", "12+", "16+", "18+"),
    releaseDate:Joi.string().required(),
    previewImage:Joi.string().required()
  });

 const VideoIdValidation=Joi.object().keys({
  videoId:Joi.string().required().regex(/^[0-9a-fA-F]{24}$/)
 })

module.exports={Bodyvalidation,VideoIdValidation};