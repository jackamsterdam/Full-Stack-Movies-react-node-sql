import "./Menu.css";
import { NavLink } from 'react-router-dom'

function Menu(): JSX.Element {
    return (
        <div className="Menu">
			<NavLink to="/home">Home</NavLink>
			<NavLink to="/movie-list">Movie List</NavLink>
			<NavLink to="/add-movie">Add Movie</NavLink>
		
        </div>
    );
}

export default Menu;
