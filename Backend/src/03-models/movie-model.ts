import Joi from "joi"

class MovieModel {
  movieId: number //PK
  cinemaId: number  //FK
  movieName: string 
  movieTime: string 
  duration: number 

  constructor(movie: MovieModel) {
     
      this.movieId = movie.movieId
      this.cinemaId = movie.cinemaId
      this.movieName = movie.movieName
      this.movieTime = movie.movieTime
      this.duration = movie.duration
  }

  private static postValidationSchema = Joi.object({
      movieId: Joi.forbidden(), 
      cinemaId: Joi.number().required().integer().min(1),
      movieName: Joi.string().required().min(2).max(100),
      movieTime: Joi.date().iso().required().iso(),  
      duration: Joi.number().required().min(0).max(1000)
  })

  validatePost():string {
      const result = MovieModel.postValidationSchema.validate(this, {abortEarly: false})
      return result.error?.message
  }
}

export default MovieModel