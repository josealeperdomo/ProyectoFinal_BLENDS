export function Compartidos (){
    <div className="row border-radius">
    <div className="feed">
        <div className="feed_title">
            <div>
                <div className="feed_title ">
                    <li className="fa fa-share compartido-post"></li>
                    <span><b>Marina Valentine</b> ha compartido la <a href="">Publicacion</a>  de <b>Marina Valentine</b></span>
                </div>
                <div className="feed_title-compartido2">
                    <img src="images/user-7.jpg" alt="" />
                    <span className="feed_title-compartido"><b>Marina Valentine</b><p>March 2 at 6:05pm</p></span>
                </div>
            </div>
        </div>
    <div className="feed_content">
        <div className="feed_content_image">
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.</p>
        </div>
        <div className="feed_content_image">
            <img src= {fotoejemplo} alt="" />
        </div>
    </div>
    <div className="feed_footer">
        <ul className="feed_footer_left">
            <li className="hover-orange selected-orange"><i className="fa fa-heart"></i> 22k</li>
            <li><span><b>Jimmy, Andrea</b> and 47 more liked this</span></li>
        </ul>
        <ul className="feed_footer_right">
        <div>
            <li className="hover-orange selected-orange"><i className="fa fa-share"></i> 7k</li>
            <li className="hover-orange"><i className="fa fa-comments-o"></i> 860 comments</li>
        </div>
         </ul>
    </div>
    </div>
</div>
}