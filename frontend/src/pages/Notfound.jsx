import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../styles/General.css";
import "../styles/Feed.css";
import NavArriba from "../components/NavArriba";
import notfound from "../img/404.gif"


export function Notfound() {
  

  return (
    <>
      <div className="home">
        {/* SECCION SUPERIOR */}
        <NavArriba />

        <section className="seccion-principal">
          <div className='div-404' >
            <img className='img-404' src={notfound} alt="" />
            <h1>404</h1>
            <h2>¡Oh no! Parece que estás perdido.</h2>
            <p>La página que estás buscando no existe. Tal vez fue secuestrada por extraterrestres... 🛸</p>
          </div>
          
        </section>
      </div>
    </>
  );
}