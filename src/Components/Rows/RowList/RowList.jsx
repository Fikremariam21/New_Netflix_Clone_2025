
import React, { useState, useEffect } from 'react';
import Row from '../Row/Row';   
import requests from '../../../Utils/requests';
import Loader from '../../Loader/Loader'; // Import Loader

const RowList = () => {
  const [loading, setLoading] = useState(true);
  
  const rowFetchUrls = [
    requests.fetchNetflixOriginals,
    requests.fetchTrending,
    requests.fetchTopRatedMovies,
    requests.fetchActionMovies,
    requests.fetchComedyMovies,
    requests.fetchHorrorMovies,
    requests.fetchRomanceMovies,
    requests.fetchDocumentaries,
    // requests.fetchUpcomingMovies,
  ];

  useEffect(() => {
    const fetchAllRows = async () => {
      try {
        await Promise.all(rowFetchUrls.map(url => fetch(url))); // Simulate fetching
        setLoading(true); // Start loading when all are fetched
      } catch (error) {
        console.error("Error fetching rows", error);
      } finally {
        setLoading(false); // Stop loading when all are fetched
      }
    };

    fetchAllRows();
  },[]);

  if (loading) {
    return <Loader />; // Show one Loader for all rows
  }

  return (
    <>
      <Row title="NETFLIX ORIGINALS" fetchUrl={requests.fetchNetflixOriginals} isLargeRow={true} />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </>
  );
};

export default RowList;
