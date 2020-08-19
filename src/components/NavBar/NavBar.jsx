import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = ({ user, handleLogout }) => {
    let nav = user ?
    <>
        <nav>
            <div className="nav-wrapper">
                <Link to='/'><img src="https://fontmeme.com/permalink/200715/767031c3b9504a762cba262e09546cc0.png" alt="PokéFaves Logo"/></Link>
                <ul id="nav-mobile" className="right">
                    <li><a href={`/user/${user._id}`} className="nav-link">Welcome, {user.name}</a></li>
                    <li><a href=" " className="nav-link" onClick={handleLogout}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    </>
    :
    <>
        <nav>
            <div className="nav-wrapper">
                <Link to='/'><img src="https://fontmeme.com/permalink/200715/767031c3b9504a762cba262e09546cc0.png" alt="PokéFaves Logo"/></Link>
                <ul id="nav-mobile" className="right">
                    <li><a href="/login" className="nav-link">Log In</a></li>
                    <li><a href="/signup" className="nav-link">Sign Up</a></li>
                </ul>
            </div>
        </nav>
    </>

    return (
    <>
        {nav}
    </>
    )
}

export default NavBar;