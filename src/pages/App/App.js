import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import './App.css';

import userService from '../../services/userService';
import { getAllPokemon } from '../../services/pokemon-api';

import NavBar from '../../components/NavBar/NavBar';
import Footer from '../../components/Footer/Footer';
import LoginPage from '../LoginPage/LoginPage';
import SignupPage from '../SignupPage/SignupPage';
import PokemonPage from '../PokemonPage/PokemonPage';
import UserPage from '../UserPage/UserPage';

class App extends Component {
  state = {
    user: userService.getUser(),
    filter: 'all',
    filteredPokemon: [],
    pokemon: []
  }

  async switchFilter(filter) {
    switch (filter) {
      case 'all': { 
        this.setState({filteredPokemon: this.state.pokemon})
        break;
      }
      case 'kanto': {
        const filteredPokemon = this.state.pokemon.slice(0,151); 
        this.setState({filteredPokemon})
        break;
      }
      case 'johto': {
        const filteredPokemon = this.state.pokemon.slice(151,251); 
        this.setState({filteredPokemon})
        break;
      }
      case 'hoenn': {
        const filteredPokemon = this.state.pokemon.slice(252,386); 
        this.setState({filteredPokemon})
        break;
      }
      case 'sinnoh': {
        const filteredPokemon = this.state.pokemon.slice(386,493); 
        this.setState({filteredPokemon})
        break;
      }
      case 'unova': {
        const filteredPokemon = this.state.pokemon.slice(493,649); 
        this.setState({filteredPokemon})
        break;
      }
      case 'kalos': {
        const filteredPokemon = this.state.pokemon.slice(649,721); 
        this.setState({filteredPokemon})
        break;
      }
      case 'alola': {
        const filteredPokemon = this.state.pokemon.slice(721,807); 
        this.setState({filteredPokemon})
        break;
      }
      default: {
        break;
      }
    }
  };

  handleFilterChange = e => {
    this.setState({filter: e.target.value})
  };

  async componentDidMount() {
    const pokemon = await getAllPokemon();
    this.setState({pokemon: pokemon.results, filteredPokemon: pokemon.results});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.switchFilter(this.state.filter);
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignupOrLogin = () => {
    this.setState({user: userService.getUser()});
  };

  render () {
    return (
      <div className='App'>
        <Route path='/'render={({history}) =>
          <NavBar 
            history={history}
            user={this.state.user}
            handleLogout={this.handleLogout}
          />
        }/>

        <main>
          {this.state.pokemon ? 
            <>
              <Route exact path='/' render={({history}) =>
                <div className='displayArea'>
                  <form className='filter' onSubmit={this.handleSubmit}>
                    <div>Filter:</div>
                    <select value={this.state.filter} onChange={this.handleFilterChange}>
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
                    {this.state.filteredPokemon.map((pokemon) => 
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
                  user={this.state.user}
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

              <Route exact path='/user/:id' render={({ history }) => 
                <UserPage
                  history={history}
                  user={this.state.user}
                  pokemon={this.state.pokemon}
                />
              }/>
            </>
            :
            <h3>Loading...</h3>
          }
        </main>
        
        <Footer />
      </div>
    );
  };
};

export default App;
