import React, { useEffect } from 'react';
import "../styles/General.css";
import "../styles/Components.css";



function NavIzq() {

    return (
        <>    
            <section className="lateral-izquierda-opciones shadow">
                <div className="left_row">
                <div className="left_row_profile">
                    
                    <div className="left_row_profile">
                        <img id="profile_pic" src="images/user.jpg" />
                        <span>Jonh Hamstrong<p>150k followers / 50 follow</p></span>
                    </div>
                </div>
                <div className="rowmenu">
                    <div className='rowmenu-ul'>
                        <li ><a href="index.html"><i className="fa fa-globe"></i>Nuevas publicaciones</a></li>
                        <li><a href="index.html"><i className="fa fa-user"></i>Mi perfil</a></li>
                        <li><a href="index.html"><i className="fa fa-users"></i>Mis amigos</a></li>
                        <li><a href="index.html"><i className="fa fa-comments-o"></i>Mis chats</a></li>
                        <li><a href="index.html"><i className="fa fa-globe"></i>Newsfeed</a></li>

                    </div>
                
                
                </div>
                </div>
                
            </section>
             
        </>
    );
}

export default NavIzq;