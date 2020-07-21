import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './PokemonPage.css';
import {getPokemonDetails} from '../../services/pokemon-api'
import {getComments, createComment, deleteComment} from '../../services/comment-api';

class PokemonPage extends Component {

    state = {
        pokemon: [],
        comments: [],
        formData: {
            msg:''
        }
    }

    async componentDidMount() {
        console.log(this.props.user)
        const pokemon = await getPokemonDetails(this.props.match.params.pokemonName)
        const comments = await getComments();
        this.setState({pokemon, comments});
    }

    handleComment = e => {
        const formData = {...this.state.formData, [e.target.name]:e.target.value}
        this.setState({formData})
    }

    addComment = async (e) => {
        e.preventDefault();
        const comment = await createComment(this.state.formData, this.state.pokemon.name)
        this.setState({comments:[...this.state.comments, comment]});
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
                <>
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
                            <span>{this.state.pokemon.height}</span>
                            <span>Weight:</span>
                            <span>{this.state.pokemon.weight}</span>
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
                                        <Link to='/' key={idx} className='fav'>Make your favorite {type.type.name} pokemon</Link>
                                    )}
                                </span>
                            :''}
                        </div>
                        <div className='commentArea'>
                            {this.props.user ? 
                                <form onSubmit={this.addComment}>
                                    <h3>Add Comment</h3>
                                    <input type="text" name='msg' onChange={this.handleComment} placeholder='Your text here'></input>
                                    <input type="submit" className='btn'/>
                                </form>
                            : ''}
                                
                            {this.state.comments.filter(comment => comment.pokemonName === this.state.pokemon.name).map((comment, idx) => 
                                <div className='comment' key={idx}>
                                    <span>Comment:</span>
                                    <span>{comment.msg}</span>
                                    <span>Posted By:</span>
                                    <span>{comment.postedBy}</span>
                                    <span></span>
                                    <input type="submit" className='btn' onClick={() => this.deleteComment(comment._id)}/>
                                </div>
                            )}

                        </div>
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
