import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import './App.css';
import userService from '../../services/userService';
import {getAllPokemon, getKantoPokemon, getJohtoPokemon, getHoennPokemon, getSinnohPokemon, getUnovaPokemon, getKalosPokemon, getAlolaPokemon} from '../../services/pokemon-api';
import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import PokemonPage from '../PokemonPage/PokemonPage';

class App extends Component {
  state = {
    user: userService.getUser(),
    filter: 'all',
    pokemon: []
  }

  async switchFilter(filter) {
    this.setState({pokemon: []})
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
      default: {
        break;
      }
    }
  };

  handleChange = e => {
    this.setState({filter: e.target.value})
  }

  async componentDidMount() {
    const pokemon = await getAllPokemon();
    this.setState({pokemon: pokemon.results});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.switchFilter(this.state.filter);
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
      <div className='App'>
        {this.state.pokemon ? 
          <>
            <Route path='/'render={({history}) =>
              <NavBar 
                history={history}
                user={this.state.user}
                handleLogout={this.handleLogout}
              />
            }/>

            <Route exact path='/' render={({history}) =>
              <div className='displayArea'>
                <form className='filter' onSubmit={this.handleSubmit}>
                  <div>Filter:</div>
                  <select value={this.state.filter} onChange={this.handleChange}>
                    <option value='all'>All Pokemon</option>
                    <option value='kanto'>Kanto Pokemon</option>
                    <option value='johto'>Johto Pokemon</option>
                    <option value='hoenn'>Hoenn Pokemon</option>
                    <option value='sinnoh'>Sinnoh Pokemon</option>
                    <option value='unova'>Unova Pokemon</option>
                    <option value='kalos'>Kalos Pokemon</option>
                    <option value='alola'>Alola Pokemon</option>
                  </select>
                  <input type='submit' value='Submit' className='btn'/>
                </form>
                
                <section>
                  {this.state.pokemon.map((pokemon) => 
                    <Link
                      key={pokemon.name}
                      to={`/pokemon/${pokemon.name}`}
                      className='pokemonCard'
                      style={{textTransform:'capitalize'}}
                      user={this.state.user}
                    >
                      {pokemon.name}
                    </Link>
                  )}
                </section>
              </div>
            }/>

            <Route exact path='/pokemon/:pokemonName' render={(props) =>
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
        :
          <h3>Loading...</h3>
        }
        <Footer />
      </div>
    );
  }
}

export default App;
