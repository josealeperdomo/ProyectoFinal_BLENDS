import React, { useEffect } from 'react';
import "../styles/General.css";
import "../styles/Components.css";



function NavDer() {

    return (
        <>
            <section className="lateral-derecha-opciones shadow">
            <div className="row ">
                <div className="row_title">
                    <span>Friend Suggestions</span>
                    <a href="friends.html">see more..</a>
                </div>
                <div className="row_contain">
                    <img src="images/user-7.jpg" alt="" />
                    <div className='info-navder'> 
                        <span><b>Francine Smith</b></span>
                        <span><p>8 Amigos en comun</p></span>
                    </div>

                    <button>+</button>
                </div>
                <div className="row_contain">
                    <img src="images/user-2.jpg" alt="" />
                    <div className='info-navder'> 
                        <span><b>Francine Smith</b></span>
                        <span><p>8 Amigos en comun</p></span>
                    </div>
                    <button>+</button>
                </div>
                <div className="row_contain">
                    <img src="images/user-6.jpg" alt="" />
                    <div className='info-navder'> 
                        <span><b>Francine Smith</b></span>
                        <span><p>8 Amigos en comun</p></span>
                        
                    </div>
                    <button>+</button>
                </div>
            </div>
            <a href="/PagoPremium">

          
            <div href="/PagoPremium" className='seccion-Premium'> 
            <p>Cambiate a premium</p>
                
                <button className='botonPremium diagonal-hover '>Premium</button>
            </div>
            </a>
            

            </section>
             
        </>
    );
}

export default NavDer;