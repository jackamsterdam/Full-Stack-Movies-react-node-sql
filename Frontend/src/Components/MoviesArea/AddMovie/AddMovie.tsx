import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CinemaModel from "../../../Models/CinemaModel";
import MovieModel from "../../../Models/MovieModel";
import moviesService from "../../../Services/MovieService";
import notify from "../../../Services/NotifyService";
import "./AddMovie.css";
import { useForm } from 'react-hook-form'

function AddMovie(): JSX.Element {

    const [cinemas, setCinemas] = useState<CinemaModel[]>([])

    const { register, handleSubmit, formState } = useForm<MovieModel>()

    const navigate = useNavigate()

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


    async function submit(movie: MovieModel): Promise<void> {
        try {
            await moviesService.addMovie(movie)
            notify.success('Movie has been added!')
            navigate('/movie-list')
        } catch (err: any) {
            notify.error(err)
        }

    }



    return (
        <div className="AddMovie Box">
            <form onSubmit={handleSubmit(submit)}>

                <h1>Add Movie</h1>

                <label>Cinema:</label>
                <select defaultValue="" {...register('cinemaId', {
                    required: {value: true, message: "Missing Cinema"}
                })}>
                    <option value="" disabled>Select Cinema</option>
                    {cinemas.map(c => <option key={c.cinemaId} value={c.cinemaId}>{c.cinemaName}</option>)}
                </select>
                <span>{formState.errors?.cinemaId?.message}</span>

                <label>Movie Name:</label>
                <input type="text" {...register('movieName', {
                    required: {value: true, message: "Missing name"}
                })}/>
                <span>{formState.errors?.movieName?.message}</span>


                <label>Movie Time:</label>
                <input type="datetime-local" {...register('movieTime', {
                    required: {value: true, message: "Missing time"}
                })}/>
                <span>{formState.errors?.movieTime?.message}</span>

                {/* min="20" max="500" */}
                <label>Duration:</label>
                <input type="number"  {...register('duration', {
                    required: {value: true, message: "Missing duration"},
                    min: {value: 0, message: "Duration can't be negative"},
                    max: {value: 1000, message: "Duration can't exceed 1000"}
                })}/>
                <span>{formState.errors?.duration?.message}</span>

                <button>Add</button>
            </form>

        </div>
    );
}

export default AddMovie;
