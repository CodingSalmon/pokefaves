import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import userService from '../../services/userService'

import './UserPage.css'

class UserPage extends Component {

    state = {
        user: userService.getUser()
    }

    async componentDidMount() {
        const user = await userService.getUserById(this.state.user._id)
        this.setState({user})
    }

    render() {
        return(
            <>
            <section>
                {Object.keys(this.state.user.favorites).map((type) =>
                    <div key={type}>
                        <p>Your favorite {type} pokemon</p>
                        <Link
                            to={`/pokemon/${this.props.user.favorites[type]}`}
                            className='pokemonCard'
                            style={{textTransform:'capitalize'}}
                        >
                            {this.state.user.favorites[type] ? this.state.user.favorites[type] : 'None'}
                        </Link>
                    </div>
                )}
            </section>
            </>
        )
    }
}

export default UserPage;