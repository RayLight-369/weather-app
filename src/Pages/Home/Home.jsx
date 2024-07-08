import React, { useEffect, useState } from 'react';
import Styles from "./Home.module.css";
import { useLocation } from 'react-router-dom';

const Home = () => {

  const searchParams = new URLSearchParams( useLocation().search );
  const [ lat, setLat ] = useState( "" );
  const [ lon, setLon ] = useState( "" );
  const [ loc, setLoc ] = useState( "" );
  const [ data, setData ] = useState( {} );


  const fetchWeatherData = async ( lat, lon ) => {
    try {

      // const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&units=metric&appid=02c7a3ac20ea610f6b85ded7b170c7b3` );
      // const data = await response.json();

      // const response2 = await fetch( `https://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ lon }&units=metric&appid=02c7a3ac20ea610f6b85ded7b170c7b3` );
      // const data2 = await response2.json();

      // console.log( data, data2 );

      const response = await fetch( "https://weatherdata-api.vercel.app/weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify( {
          lat,
          lon
        } )
      } );

      const body = await response.json();
      console.log( JSON.stringify( body[ 0 ], null, 2 ) );
      setData( body[ 0 ] );

    } catch ( err ) {
      console.log( err );
    }
  };

  useEffect( () => {
    setLat( searchParams.get( "lat" ) );
    setLon( searchParams.get( "lon" ) );
    setLoc( searchParams.get( "n" ) );
  }, [ searchParams ] );

  useEffect( () => {
    fetchWeatherData( lat, lon );
  }, [ lat, lon ] );


  if ( lat && data?.current?.temperature ) {

    return (
      <section className={ Styles[ 'weather-details' ] }>
        <div className={ Styles[ 'current-weather' ] }>
          <div className={ Styles[ "temperature" ] }>
            <p>{ data.current.temperature } <sup>°C</sup></p>
          </div>
          <div className={ Styles[ "location" ] }>
            <p>{ loc ? loc : data.location.name }</p>
          </div>
          <div className={ Styles[ "time" ] }>
            <p>10:16 am</p>
          </div>
        </div>
        <div className={ Styles[ "forecast" ] }>
          <div className={ Styles[ "expectations" ] }></div>
          <div className={ Styles[ "next-days" ] }></div>
        </div>
      </section>
    );

  } else {
    return;
  }

};

export default Home;