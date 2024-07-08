import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Styles from "./Navbar.module.css";


const Navbar = () => {

  const [ query, setQuery ] = useState( "" );
  const [ list, setDataList ] = useState( [] );
  const [ weatherData, setData ] = useState( {} );
  const navigate = useNavigate();

  useEffect( () => {
    const getCurrentLocation = () => {
      if ( navigator.geolocation ) {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            navigate( `?lat=${ latitude }&lon=${ longitude }` );
          },
          error => {
            console.error( 'Error getting geolocation:', error );
          }
        );
      } else {
        console.error( 'Geolocation is not supported by this browser.' );
      }
    };

    if ( !query.trim().length ) {
      getCurrentLocation();
    }
  }, [] );



  useEffect( () => {
    const locationList = async () => {
      try {
        const response = await fetch( `http://api.openweathermap.org/geo/1.0/direct?q=${ query }&limit=10&appid=02c7a3ac20ea610f6b85ded7b170c7b3` );
        const data = await response.json();
        const formatted = data.map( ( value, key ) => ( {
          name: value?.state ? value.name + ", " + value.state : value.name,
          lat: value.lat,
          lon: value.lon
        } ) );

        if ( formatted.length > 0 ) setDataList( formatted );
        else setDataList( [] );

      } catch ( e ) {
        console.log( e );
      }

    };

    if ( query.trim().length ) {
      locationList();
    } else {
      setDataList( [] );
    }

  }, [ query ] );

  useEffect( () => {
    console.log( list );
  }, [ list ] );

  // const fetchWeatherData = async ( lat, lon ) => {
  //   try {

  //     // const response = await fetch( `https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&units=metric&appid=02c7a3ac20ea610f6b85ded7b170c7b3` );
  //     // const data = await response.json();

  //     // const response2 = await fetch( `https://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ lon }&units=metric&appid=02c7a3ac20ea610f6b85ded7b170c7b3` );
  //     // const data2 = await response2.json();

  //     // console.log( data, data2 );

  //     const response = await fetch( "https://weatherdata-api.vercel.app/weather", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify( {
  //         lat,
  //         lon
  //       } )
  //     } );

  //     const body = await response.json();

  //     console.log( body );

  //     setData( body[ 0 ] );

  //   } catch ( err ) {
  //     console.log( err );
  //   }
  // };

  function capitalizeFirstLetterOfEachWord ( str ) {
    return str.replace( /\b\w/g, char => char.toUpperCase() );
  }


  return (
    <>
      <header className={ Styles[ 'header' ] }>
        <nav className={ Styles[ 'nav' ] }>
          <Link className={ Styles[ 'logo' ] } to={ "/" }>Weatheray</Link>
          <input placeholder='Location' type="text" list='location' value={ query } onChange={ e => setQuery( e.target.value ) } onInput={ e => {
            const inputValue = e.target.value;
            const list = document.querySelector( `option[value="${ capitalizeFirstLetterOfEachWord( inputValue ) }"]` );
            const optionValue = list?.textContent;
            if ( optionValue ) {

              const [ lat, lon ] = optionValue.split( ' ' );
              navigate( `?lat=${ lat }&lon=${ lon }&n=${ list?.value }` );
              // fetchWeatherData( lat, lon );

            }

          } } />
          <datalist name="location" id='location'>
            { list.map( ( value, index ) => (
              <option value={ value.name } key={ index }>{ `${ value.lat } ${ value.lon }` }</option>
            ) ) }
          </datalist>
        </nav>
        <Outlet />
      </header>
      <img className={ Styles[ 'weather-bg' ] } id={ Styles[ 'cloudy' ] } src="/Imgs/cloudy.jpg" alt="cloudy" />
      <img className={ Styles[ 'weather-bg' ] } id={ Styles[ 'rainy' ] } src="/Imgs/rainy.jpg" alt="rainy" />
      <img className={ Styles[ 'weather-bg' ] } id={ Styles[ 'sunny' ] } src="/Imgs/sunny.png" alt="sunny" />
      <img className={ Styles[ 'weather-bg' ] } id={ Styles[ 'thunderstorm' ] } src="/Imgs/thunderstorm.jpg" alt="thunderstorm" />
      <img className={ Styles[ 'weather-bg' ] } id={ Styles[ 'smoky' ] } src="/Imgs/smoky.jpg" alt="smoky" />
    </>
  );
};

export default Navbar;