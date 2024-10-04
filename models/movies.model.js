const mongoose=require("mongoose");

const moviessSchema=new mongoose.Schema({
    title:String,
    releaseYear:String,
    genre:String,
    director:String,
    actors:[{type:String}],
    language:String,
    country:String,
    rating: {
        type: Number, 
        min: 0, 
        max: 5, 
        required: true
      },
    plot:String,
    awards:String,
    posterUrl:String,
    trailerUrl:String,

})

const Moviesss=mongoose.model("Moviesss", moviessSchema)

module.exports={Moviesss};