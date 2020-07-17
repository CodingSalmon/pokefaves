import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './PokemonPage.css';
import {getPokemonDetails} from '../../services/pokemon-api'

class PokemonPage extends Component {
    state = {
        pokemon: []
    }

    async componentDidMount() {
        const pokemon = await getPokemonDetails(this.props.match.params.pokemonName)
        this.setState({pokemon: pokemon})
    }

    render() {
        return (
            <div className='PokemonPage'>
                {this.state.pokemon.name ?
                <>
                    <div className='PokemonPage-image'>
                        <span><img height="250" src={this.state.pokemon.sprites.front_default} alt=""/></span>
                    </div>
                    <div className='PokemonPage-details'>
                        <span>Name:</span>
                        <span style={{textTransform: 'capitalize'}}>{this.state.pokemon.name}</span>
                        <span>Type(s):</span>
                        <span>
                            {this.state.pokemon.types.map((type) =>
                                <div style={{textTransform: 'capitalize'}}>{type.type.name}</div>
                                )
                            }
                        </span>
                        <span>Height:</span>
                        <span>{this.state.pokemon.height}</span>
                        <span>Weight:</span>
                        <span>{this.state.pokemon.weight}</span>
                        <span>Abilities:</span>
                        <span>
                            {this.state.pokemon.abilities.map((ability) =>
                                <div style={{textTransform: 'capitalize'}}>{ability.ability.name}</div>
                                )
                            }
                        </span>
                        <span>Base HP:</span>
                        <span>{this.state.pokemon.stats[5].base_stat}</span>
                        <span>Base Attack:</span>
                        <span>{this.state.pokemon.stats[4].base_stat}</span>
                        <span>Base Defense:</span>
                        <span>{this.state.pokemon.stats[3].base_stat}</span>
                        <span>Base Special-Attack:</span>
                        <span>{this.state.pokemon.stats[2].base_stat}</span>
                        <span>Base Special-Defense:</span>
                        <span>{this.state.pokemon.stats[1].base_stat}</span>
                        <span>Base Speed:</span>
                        <span>{this.state.pokemon.stats[0].base_stat}</span>
                        <Link to='/'>Back to Index</Link>
                        <span className='favs'>
                            {this.state.pokemon.types.map((type) =>
                                <Link to='/' className='fav'>Make your favorite {type.type.name} pokemon</Link>
                            )}
                        </span>
                    </div>
                </>
                :
                <h3>Loading...</h3>
                }
            </div>
        )
    }
}

export default PokemonPage;
