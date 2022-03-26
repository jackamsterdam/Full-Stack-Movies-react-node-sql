import axios from "axios";
import CinemaModel from "../Models/CinemaModel";
import MovieModel from "../Models/MovieModel";
import config from "../Utils/Config";

class MoviesService {

  async getAllCinemas(): Promise<CinemaModel[]> {
    const response = await axios.get<CinemaModel[]>(config.cinemasUrl);
    const cinemas = response.data;
    return cinemas;
  }

  async getMoviesByCinema(cinemaId: number):Promise<MovieModel[]>{
    const response = await axios.get<MovieModel[]>(config.moviesByCinemaUrl + cinemaId);
    const movies = response.data 
    return movies 

  }

  async addMovie(movie: MovieModel):Promise<MovieModel> {
    const response = await axios.post<MovieModel>(config.moviesUrl, movie);
    const addedMovie = response.data 
    return addedMovie 

  }

  async deleteMovie(movieId: number):Promise<void> {
    await axios.delete(config.moviesUrl + movieId);
  }


}

const moviesService = new MoviesService();
export default moviesService;
