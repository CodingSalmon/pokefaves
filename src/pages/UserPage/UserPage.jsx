import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './UserPage.css'

class UserPage extends Component {

    render() {
        return(
            <>
            {this.props.user ? 
            <section>
                {Object.keys(this.props.user.favorites).map((type) =>
                    <div key={type}>
                        <p>Your favorite {type} pokemon</p>
                        <Link
                            to={`/pokemon/${this.props.user.favorites[type]}`}
                            className='pokemonCard'
                            style={{textTransform:'capitalize'}}
                        >
                            {this.props.user.favorites[type] ? this.props.user.favorites[type] : 'None'}
                        </Link>
                    </div>
                )}
            </section>
            :'Loading...'}
            </>
        )
    }
}

export default UserPage;