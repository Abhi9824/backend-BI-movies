const mongoose=require('mongoose')
const express=require("express")
const cors=require('cors')
const app=express()

const corsOption={
    origin:"*",
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOption))
app.use(express.json())

const {initializeDatabase}=require("./db/db.connection")
const {Moviesss}=require("./models/movies.model")
initializeDatabase();

app.get("/", async(req,res)=>{
    res.json("Hello, Express!")

})

app.get("/movies", async(req,res)=>{
    try{

        const allMovies=await Moviesss.find()
        res.json(allMovies)
    }catch(error){
        res.status(500).json({error:"Internal server error"})
    }
})

async function  createMovie(newMovie){
    try{
        const movie=new Moviesss(newMovie)
        const saveMovie=await movie.save()
        return saveMovie

    }catch(error){
        throw error
    }
}

app.post("/movies", async(req,res)=>{
    try{
        const savedMovie=await createMovie(req.body)
        res.status(201).json({message:"Movie added successfully", movie:savedMovie})

    }catch(error){
        res.status(500).json({error:"Failed to add Movie"})
    }
})


async function getMovieByTitle(titleName) {
    try {
      const movie = await Moviesss.findOne({ title: titleName });
      return movie;
    } catch (error) {
      throw error;
    }
  }
  
  //api route for getting the movie by director name
  app.get("/movies/title/:titleName", async (req, res) => {
    try {
      const movie = await getMovieByTitle(req.params.titleName);
      if (movie.length != 0) {
        res.json(movie);
      } else {
        res.status(404).json({ error: "Movie not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch Movie." });
    }
  });
  
  //get movie by director name
  
  async function readMovieByGenre(genreName) {
    try {
      const movie = await Moviesss.find({ genre: genreName });
      return movie;
    } catch (error) {
      throw error;
    }
  }
  
  app.get("/movies/genres/:genreName", async (req, res) => {
    try {
      const movie = await readMovieByGenre(req.params.genreName);
      if (movie.length != 0) {
        res.json(movie);
      } else {
        res.status(400).json({ error: "Movie not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movies" });
    }
  });
  
  async function deleteMovie(movieId) {
    try {
      const deletedMovie = await Moviesss.findByIdAndDelete(movieId);
      return deletedMovie;
    } catch (error) {
      throw error;
    }
  }
  
  app.delete("/movies/:movieId", async (req, res) => {
    try {
      const deletedMovie = await deleteMovie(req.params.movieId);
      if (deletedMovie) {
        res.status(200).json({
          message: "Movie deleted successfully.",
          deletedMovie: deletedMovie,
        });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch movie data." });
    }
  });

const PORT=process.env.PORT || 3000;
app.listen(PORT, async()=>{
console.log(`Server is running on port ${PORT}`)
})


