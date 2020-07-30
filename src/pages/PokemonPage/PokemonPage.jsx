import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './PokemonPage.css';

import { getPokemonDetails } from '../../services/pokemon-api'
import { getComments, createComment, deleteComment } from '../../services/comment-api';
import userServices from '../../services/userService'

class PokemonPage extends Component {

    state = {
        pokemon: [],
        comments: [],
        formData: {
            msg:'',
            pokemonName:''
        }
    }

    async componentDidMount() {
        const pokemon = await getPokemonDetails(this.props.match.params.pokemonName)
        const comments = await getComments();
        this.setState({pokemon, comments, formData:{pokemonName:pokemon.name}});
    }

    handleChange = e => {
        const formData = {...this.state.formData, [e.target.name]:e.target.value}
        this.setState({formData})
    }

    async handleFavorite(type) {
        if(this.props.user[`${type}`] !== this.state.pokemon.name){
            this.props.user[`${type}`] = this.state.pokemon.name;
            await userServices.favoritePokemon(this.state.user.id, this.state.pokemon.name);
        } else {
            this.props.user[`${type}`] = undefined;
        }
    }

    addComment = async (e) => {
        e.preventDefault();
        const comment = await createComment(this.state.formData)
        this.setState({comments:[...this.state.comments, comment], formData: {msg:''}});
    }

    async deleteComment(id){
        await deleteComment(id);
        this.setState(state => ({
            comments: state.comments.filter(comment => comment._id !== id)
        }),() => this.props.history.push(`/pokemon/${this.state.pokemon.name}`))
    }

    render() {
        return (
            <div className='PokemonPage'>
                {this.state.pokemon.name ?
                <div>
                    <div className='PokemonPage-image'>
                        <span><img height="250" src={this.state.pokemon.sprites.front_default} alt=""/></span>
                    </div>

                    <div className='content'>
                        <div className='PokemonPage-details'>
                            <span>Name:</span>
                            <span style={{textTransform: 'capitalize'}}>{this.state.pokemon.name}</span>
                            <span>Type(s):</span>
                            <span>
                                {this.state.pokemon.types.map((type, idx) =>
                                    <div key={idx} style={{textTransform: 'capitalize'}}>{type.type.name}</div>
                                    )
                                }
                            </span>
                            <span>Height:</span>
                            <span>{Math.floor(this.state.pokemon.height / 3.048)} ft. {Math.ceil(12 * (this.state.pokemon.height / 3.048 - Math.floor(this.state.pokemon.height / 3.048)))} in.</span>
                            <span>Weight:</span>
                            <span>{Math.ceil(this.state.pokemon.weight / 4.536)} lbs.</span>
                            <span>Abilities:</span>
                            <span>
                                {this.state.pokemon.abilities.map((ability, idx) =>
                                    <div key={idx} style={{textTransform: 'capitalize'}}>{ability.ability.name}</div>
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
                            {this.props.user ? 
                                <span className='favs'>
                                    {this.state.pokemon.types.map((type, idx) =>
                                        <Link to='/' key={idx} className='fav' onClick={() => this.handleFavorite(type.type.name)}>
                                            {(this.props.user[`${type.type.name}`] !== this.state.pokemon.name) ? `Make your favorite ${type.type.name} pokemon`: `Get rid of my favorite ${type.type.name} pokemon`}
                                        </Link>
                                    )}
                                </span>
                            :''}
                        </div>

                        <div className='commentArea'>
                            {this.props.user ? 
                                <form className='commentForm' onSubmit={this.addComment}>
                                    <h4>Add Comment</h4>
                                    <input type="text" name='msg' onChange={this.handleChange} placeholder='Your text here'></input>
                                    <input type="submit" className='btn'/>
                                </form>
                            : ''}

                            <h3>Comments</h3>
                            {this.state.comments !== [] ? 
                                this.state.comments.filter(comment => comment.pokemonName === this.state.pokemon.name).map((comment, idx) => 
                                    <div className='comment' key={idx}>
                                        <span>Comment:</span>
                                        <span>{comment.msg}</span>
                                        <span>Posted By:</span>
                                        <span>{comment.posterName}</span>
                                        <span></span>
                                        {this.props.user && this.props.user._id === comment.postedBy ?
                                            <input type="submit" value='DELETE' className='btn' onClick={() => this.deleteComment(comment._id)}/>
                                        :''}
                                    </div>
                                )
                                : <h4>No Comments Yet</h4>
                            }
                        </div>
                    </div>
                </div>
                :
                <h3>Loading...</h3>
                }
            </div>
        )
    }
}

export default PokemonPage;
