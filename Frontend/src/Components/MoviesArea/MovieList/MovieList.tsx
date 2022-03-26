import { SyntheticEvent, useEffect, useState } from "react";
import CinemaModel from "../../../Models/CinemaModel";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MovieService";
import notify from "../../../Services/NotifyService";
import "./MovieList.css";

function MovieList(): JSX.Element {

    const [cinemas, setCinemas] = useState<CinemaModel[]>([])

    const [movies, setMovies] = useState<MovieModel[]>([])

    useEffect(() => {
        (async function () {
            try {
                const cinemas = await moviesService.getAllCinemas()
                setCinemas(cinemas)
            } catch (err: any) {
                notify.error(err)
            }
        })()
    }, [])

    async function changeHandler(e: SyntheticEvent): Promise<void> {
        try {
            const cinemaId = +(e.target as HTMLSelectElement).value
            const movies = await moviesService.getMoviesByCinema(cinemaId)
            setMovies(movies)
        } catch (err: any) {
            notify.error(err)
        }

    }

    function formatDateTime(dateTime: string): string {
        const d = new Date(dateTime)
        return d.toLocaleString()
    }

    async function deleteMovie(movieId: number): Promise<void> {
        try {
            const confirmDelete = window.confirm('Are you sure?')
            if (!confirmDelete) return

            await moviesService.deleteMovie(movieId)

            const moviesCopy = [...movies]
            const indexToDelete = movies.findIndex(m => m.movieId === movieId)
            moviesCopy.splice(indexToDelete, 1)
            setMovies(moviesCopy)
            notify.success('Movie has been deleted')

        } catch (err: any) {
            notify.error(err)
        }



    }


    return (
        <div className="MovieList">

            <select defaultValue="" onChange={changeHandler}>
                <option value="" disabled>Select Cinema</option>
                {cinemas.map(c => <option key={c.cinemaId} value={c.cinemaId}>{c.cinemaName}</option>)}
            </select>

            {movies.length !== 0 && <table>
                <thead>
                    <tr>
                        <th>Movie Name</th>
                        <th>Movie Time</th>
                        <th>Duration</th>
                        <th>Cinema Name</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(m => <tr key={m.movieId}>
                        <td>{m.movieName}</td>
                        <td>{formatDateTime(m.movieTime)}</td>
                        <td>{m.duration}</td>
                        <td>{m.cinemaName}</td>
                        <td><button onClick={() => deleteMovie(m.movieId)}>❌</button></td>
                    </tr>)}
                </tbody>
            </table>}

        </div>
    );
}

export default MovieList;
