import "./Home.css";
import imageSource from '../../../Assets/Images/movie-home.jpg'
function Home(): JSX.Element {
    return (
        <div className="Home">
			<h1>Welcome to the Movie Site</h1>
            <img src={imageSource}/>
        </div>
    );
}

export default Home;
