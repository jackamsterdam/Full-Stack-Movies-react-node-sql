import { OkPacket } from "mysql";
import dal from "../04-dal/dal";
import ErrorModel from "../03-models/error-model";
import CinemaModel from "../03-models/cinema-model";
import MovieModel from "../03-models/movie-model";



async function getAllCinemas():Promise<CinemaModel[]>{
  const sql = `SELECT * FROM cinemas`

  const cinemas = await dal.execute(sql)
  return cinemas
}

async function getMoviesByCinema(cinemaId: number):Promise<MovieModel[]>{
   const sql = `SELECT m.*, c.cinemaName AS cinemaName
                FROM cinemas as c 
                INNER JOIN movies as m
                  ON c.cinemaId = m.cinemaId
                  WHERE c.cinemaId = ?
                  ORDER BY m.movieTime, m.duration`

    const movies = await dal.execute(sql, [cinemaId])

    if (movies.length === 0) throw new ErrorModel(404, `Resource with cinemaId ${cinemaId} not found`)

    return movies 

}

async function addMovie(movie: MovieModel):Promise<MovieModel> {
    const errors = movie.validatePost() 
    if (errors) throw new ErrorModel(400, errors)

    const sql = `INSERT INTO movies VALUES(DEFAULT, ?,?,?,?)`

    const info: OkPacket = await dal.execute(sql, [movie.cinemaId, movie.movieName, movie.movieTime, movie.duration])

    movie.movieId = info.insertId

    return movie 
}

async function deleteMovie(movieId: number):Promise<void> {
   const sql = `DELETE FROM movies WHERE movieId = ?`

   const info: OkPacket = await dal.execute(sql, [movieId])

   if (info.affectedRows === 0) throw new ErrorModel(404, `Resource with movieId ${movieId} not found`)
}

export default {
    getAllCinemas,
    getMoviesByCinema,
    addMovie,
    deleteMovie
}