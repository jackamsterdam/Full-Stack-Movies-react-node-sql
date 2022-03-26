class Config {

}

class DevelopmentConfig extends Config {
 
    cinemasUrl = "http://localhost:3001/api/cinemas/"
    moviesByCinemaUrl = "http://localhost:3001/api/movies-by-cinema/"
    moviesUrl = "http://localhost:3001/api/movies/"

}

class ProductionConfig extends Config {
    cinemasUrl = "http://localhost:3001/api/cinemas/"
    moviesByCinemaUrl = "http://localhost:3001/api/movies-by-cinema/"
    moviesUrl = "http://localhost:3001/api/movies/"
}

const config = process.env.NODE_ENV === 'production' ? new ProductionConfig() : new DevelopmentConfig()

export default config