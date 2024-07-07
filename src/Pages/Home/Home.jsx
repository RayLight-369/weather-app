import React, { useEffect, useState } from 'react';
import Styles from "./Home.module.css";

const Home = () => {

  return (
    <section className={ Styles[ 'weather-details' ] }>
      <div className={ Styles[ 'current-weather' ] }>
        <div className={ Styles[ "temperature" ] }>
          <p>21 <sup>°C</sup></p>
        </div>
        <div className={ Styles[ "location" ] }>
          <p>Lahore, Pakistan</p>
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
};

export default Home;