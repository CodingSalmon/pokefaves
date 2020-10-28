import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class UserPage extends Component {

    componentDidMount() {
        let i;
        Object.entries(this.props.user).forEach(pair => {
            while(i < 6){
                console.log(`${pair}`)
            }
            i++
        })
    }

    render() {
        return(
            <>
            <section>
                {this.props.pokemon.map((pokemon) => 
                    <Link
                        key={pokemon.name}
                        to={`/pokemon/${pokemon.name}`}
                        className='pokemonCard'
                        style={{textTransform:'capitalize'}}
                    >
                        {pokemon.name}
                    </Link>
                )}
            </section>
            </>
        )
    }
}

export default UserPage;