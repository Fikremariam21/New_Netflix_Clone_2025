
import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../../Utils/axios';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';
import styles from './Row.module.css';
import Loader from '../../Loader/Loader'; // Import the Loader component

const base_url = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fetchUrl) return; 

    const fetchData = async () => {
      setIsLoading(true); // Start loading before fetching
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Stop loading after fetching (success or error)
      }
    };

    fetchData();
  }, [fetchUrl]); // The effect runs whenever fetchUrl changes.

  const handleClick = useCallback((movie) => {
    const fetchTrailer = async () => {
      try {
        const url = await movieTrailer(movie?.title || movie?.name || movie?.original_name);
        const urlParams = new URLSearchParams(new URL(url).search);
        setTrailerUrl(urlParams.get('v'));
      } catch (error) {
        console.log("Trailer not found", error);
        setTrailerUrl('');
      }
    };

    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      fetchTrailer();
    }
  }, [trailerUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
 
  return (
    <div className={styles.row}>
      <h1>{title}</h1>

      {isLoading ? (
        <Loader /> // Show loader while data is being fetched
      ) : (
        <div className={styles.row_posters}>
          {movies?.map((movie, index) => (
            <img
              key={index}
              onClick={() => handleClick(movie)}
              src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              className={`${styles.row_poster} ${isLargeRow ? styles.row_posterLarge : ""}`}
              onError={(e) => e.target.style.display = "none"}
            />
          ))}
        </div>
      )}

      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
