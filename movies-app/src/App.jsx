import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { FaFacebook, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";

const API_KEY = "6b4357c41d9c606e4d7ebe2f4a8850ea";
const MOVIE_API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const GENRE_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const newsList = [
    {
      title: "New Film Breaks Box Office Records",
      date: "2024-09-20",
      description:
        "The new film 'Shining Stars' has achieved massive success, surpassing $100 million in revenue in its opening week.",
      image: "https://image.tmdb.org/t/p/w500/4zqN8V0fK6ZB00fMXFh2Z2H9kKU.jpg",
    },
    {
      title: "Cannes Film Festival Announces Competition Lineup",
      date: "2024-09-18",
      description:
        "The films competing in this year's Cannes Film Festival have been announced, showcasing some of the best talent in the industry.",
      image: "https://image.tmdb.org/t/p/w500/g7jU0l2ZC1y3nZnV2UydBRJQKjC.jpg",
    },
    {
      title: "Young Star Joins Highly Anticipated Movie Cast",
      date: "2024-09-15",
      description:
        "The director announced that a young star has joined the cast of the upcoming film 'Legend of the Sea', set to release next year.",
      image: "https://image.tmdb.org/t/p/w500/uD5MZzNorqjU7w0G5gdtV8Q6vWy.jpg",
    },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(MOVIE_API_URL);
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchGenres = async () => {
      try {
        const { data } = await axios.get(GENRE_API_URL);
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchMovies();
    fetchGenres();
  }, []);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "";
      })
      .join(", ");
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating, fullStars = false) => {
    const stars = [];
    const maxStars = 5;
    const filledStars = fullStars ? maxStars : Math.round(rating / 2); // Show full stars if specified

    for (let i = 1; i <= maxStars; i++) {
      stars.push(
        <span key={i} className={i <= filledStars ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Atlanta Movies</h1>
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
      </header>
      <div className="social-links">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a>
      </div>
      <main>
        <section className="main-movie">
          <h2>Trending Movie</h2>
          {movies.length > 0 && (
            <div className="main-movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movies[0].poster_path}`}
                alt={movies[0].title}
              />
              <div className="details">
                <h3>{movies[0].title}</h3>
                <p>{getGenreNames(movies[0].genre_ids)}</p>
                <p>{movies[0].release_date}</p>
                <div className="rating">
                  {renderStars(movies[0].vote_average, true)}
                </div>{" "}
                {/* Full stars for trending movie */}
                <button
                  className="see-all"
                  onClick={() => alert("Feature not implemented")}
                >
                  See All Movies
                </button>
              </div>
            </div>
          )}
        </section>
        <section className="all-movies">
          <h2>All Movies</h2>
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w370_and_h556_bestv2/${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>{getGenreNames(movie.genre_ids)}</p>
                <p>{movie.release_date}</p>
                <div className="rating">{renderStars(movie.vote_average)}</div>
                <button
                  className="see-more"
                  onClick={() => alert("Feature not implemented")}
                >
                  See More
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="news-section">
          <h2>Latest News</h2>
          <div className="news-list">
            {newsList.map((news, index) => (
              <div key={index} className="news-card">
                <img src={news.image} alt={news.title} className="news-image" />
                <div className="news-details">
                  <h3>{news.title}</h3>
                  <p className="news-date">{news.date}</p>
                  <p>{news.description}</p>
                </div>
                ٍ
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 Atlanta Movies</p>
      </footer>
    </div>
  );
};

export default App;
