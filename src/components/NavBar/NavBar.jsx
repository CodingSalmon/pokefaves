import React from 'react';

const NavBar = ({ user, handleLogout }) => {
    let nav = user ?
    <>
        <nav>
            <div className="nav-wrapper">
                <a href='/pokemon'><img className='center' src="https://fontmeme.com/permalink/200715/767031c3b9504a762cba262e09546cc0.png" alt="PokéFaves Logo"/></a>
                <ul id="nav-mobile" className="right">
                    <li><a href=" " className="nav-link">Welcome, {user.name}</a></li>
                    <li><a href=" " className="nav-link" onClick={handleLogout}>Log Out</a></li>
                </ul>
            </div>
        </nav>
    </>
    :
    <>
        <nav>
            <div className="nav-wrapper">
                <img src="https://fontmeme.com/permalink/200715/767031c3b9504a762cba262e09546cc0.png" alt="PokéFaves Logo"/>
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