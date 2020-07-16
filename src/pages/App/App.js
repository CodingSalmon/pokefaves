import React, { Component } from 'react';
import { Route, Redirect, Link } from 'react-router-dom'
import './App.css';
import NavBar from '../../components/NavBar/NavBar';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import userService from '../../services/userService';
import {getAllPokemon, getPokemonDetails, getKantoPokemon, getJohtoPokemon, getHoennPokemon, getSinnohPokemon, getUnovaPokemon, getKalosPokemon, getAlolaPokemon} from '../../services/pokemon-api';
import PokemonPage from '../PokemonPage/PokemonPage';

class App extends Component {
  state = {
    user: userService.getUser(),
    filter: 'all',
    pokemon: []
  }

  async switchFilter(filter) {
    switch (filter) {
      case 'all': {
        const pokemon = await getAllPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'kanto': {
        const pokemon = await getKantoPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'johto': {
        const pokemon = await getJohtoPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'hoenn': {
        const pokemon = await getHoennPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'sinnoh': {
        const pokemon = await getSinnohPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'unova': {
        const pokemon = await getUnovaPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'kalos': {
        const pokemon = await getKalosPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
      case 'alola': {
        const pokemon = await getAlolaPokemon(); 
        this.setState({pokemon: pokemon.results})
        break;
      }
    }
  };

  async componentDidMount() {
    const pokemon = await getAllPokemon();
    this.setState({pokemon: pokemon.results});
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  }

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  }

  render () {
    return (
      <>
        <Route path='/'render={({history}) =>
          <NavBar 
            history={history}
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        }/>

        <Route exact path='/' render={({history}) =>
          <>
            <form onSubmit={() => this.switchFilter(this.state.filter)}>
              <label>
                Filter:
                <select value={this.state.filter}>
                  <option value='all'>All Pokemon</option>
                  <option value='kanto'>Kanto Pokemon</option>
                  <option value='johto'>Johto Pokemon</option>
                  <option value='hoenn'>Hoenn Pokemon</option>
                  <option value='sinnoh'>Sinnoh Pokemon</option>
                  <option value='unova'>Unova Pokemon</option>
                  <option value='kalos'>Kalos Pokemon</option>
                  <option value='alola'>Alola Pokemon</option>
                </select>
              </label>
              <input type='submit' value='Submit'/>
            </form>
            
            <section>
              {this.state.pokemon.map((pokemon, idx) => 
                <Link
                  key={pokemon.name}
                  to={`/pokemon/${idx + 1}`}
                  className='pokemonCard'
                >
                  {pokemon.name}
                </Link>
              )}
            </section>
          </>
        }/>

        <Route exact path='/pokemon/:idx' render={(props) =>
          <PokemonPage 
            {...props}
          />
        }/>

        <Route exact path='/signup' render={({ history }) => 
          <SignupPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>

        <Route exact path='/login' render={({ history }) => 
          <LoginPage
            history={history}
            handleSignupOrLogin={this.handleSignupOrLogin}
          />
        }/>
        
      </>
    );
  }
}

export default App;
