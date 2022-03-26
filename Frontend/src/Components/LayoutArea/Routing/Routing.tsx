import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../../HomeArea/Home/Home';
import AddMovie from '../../MoviesArea/AddMovie/AddMovie';
import MovieList from '../../MoviesArea/MovieList/MovieList';
import PageNotFound from '../PageNotFound/PageNotFound';

function Routing(): JSX.Element {
    return (
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/movie-list" element={<MovieList/>}/>
          <Route path="/add-movie" element={<AddMovie/>}/>
          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="*" element={<PageNotFound/>} />
        </Routes>
    );
}

export default Routing;
