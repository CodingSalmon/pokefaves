import React, { useEffect, useState } from "react";
import { Route, Link, Routes } from "react-router-dom";

import "./App.css";

import userService from "../../services/userService";
import { getAllPokemon } from "../../services/pokemon-api";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import LoginPage from "../LoginPage/LoginPage";
import SignupPage from "../SignupPage/SignupPage";
import PokemonPage from "../PokemonPage/PokemonPage";
import UserPage from "../UserPage/UserPage";

const App = () => {
  const [user, setUser] = useState(null);
  // const [query, setQuery] = useState('')
  // const [filter, setFilter] = useState('all')
  // const [filteredPokemon, setFilteredPokemon] = useState([])
  const [allPokemon, setAllPokemon] = useState([]);

  const [state, setState] = useState({
    query: "",
    filter: "all",
    filteredPokemon: [],
  });

  const switchFilter = async (filter) => {
    switch (filter) {
      case "all": {
        const filteredPokemon = allPokemon.filter((pokemon) =>
          pokemon.name.includes(state.query)
        );
        setState({ ...state, filteredPokemon });
        break;
      }
      case "kanto": {
        const filteredPokemon = allPokemon
          .slice(0, 151)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      case "johto": {
        const filteredPokemon = allPokemon
          .slice(151, 251)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      case "hoenn": {
        const filteredPokemon = allPokemon
          .slice(251, 386)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      case "sinnoh": {
        const filteredPokemon = allPokemon
          .slice(386, 493)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      case "unova": {
        const filteredPokemon = allPokemon
          .slice(493, 649)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      case "kalos": {
        const filteredPokemon = allPokemon
          .slice(649, 721)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      case "alola": {
        const filteredPokemon = allPokemon
          .slice(721, 807)
          .filter((pokemon) => pokemon.name.includes(state.query));
        setState({ ...state, filteredPokemon });
        break;
      }
      default: {
        break;
      }
    }
  };

  useEffect(() => {
    (async () => {
      setUser(userService.getUser());
      const pokemon = await getAllPokemon();
      setAllPokemon(pokemon.results);
      setState((state) => ({
        ...state,
        filteredPokemon: pokemon.results,
      }));
    })();
  }, []);

  const handleSearchChange = (e) => {
    setState({ ...state, query: e.target.value });
  };

  const handleFilterChange = (e) => {
    setState({ ...state, filter: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    switchFilter(state.filter);
  };

  const handleLogout = () => {
    userService.logout();
    setUser(null);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
  };

  const handleFavorite = async (type, pokemon) => {
    const newFavorites = user.favorites;
    if (user.favorites[type] !== pokemon.name) {
      newFavorites[type] = pokemon.name;
    } else {
      newFavorites[type] = "";
    }
    await userService.handleFavorite(newFavorites, type, pokemon.name);
    setUser({
      ...user,
      favorites: newFavorites,
    });
  };

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        {allPokemon ? (
          <>
            <Route
              exact
              path="/"
              element={
                <main>
                  <div className="displayArea">
                    <form className="filter" onSubmit={handleSubmit}>
                      <input
                        type="text"
                        value={state.query}
                        onChange={handleSearchChange}
                      />
                      <div>Filter:</div>
                      <select
                        value={state.filter}
                        onChange={handleFilterChange}
                      >
                        <option value="all">All Pokemon</option>
                        <option value="kanto">Kanto Pokemon</option>
                        <option value="johto">Johto Pokemon</option>
                        <option value="hoenn">Hoenn Pokemon</option>
                        <option value="sinnoh">Sinnoh Pokemon</option>
                        <option value="unova">Unova Pokemon</option>
                        <option value="kalos">Kalos Pokemon</option>
                        <option value="alola">Alola Pokemon</option>
                      </select>
                      <input type="submit" value="Submit" className="btn" />
                    </form>

                    <section>
                      {state.filteredPokemon.map((pokemon) => (
                        <Link
                          key={pokemon.name}
                          to={`/pokemon/${pokemon.name}`}
                          className="pokemonCard"
                          style={{ textTransform: "capitalize" }}
                          user={state.user}
                        >
                          {pokemon.name}
                        </Link>
                      ))}
                    </section>
                  </div>
                </main>
              }
            />

            <Route
              exact
              path="/pokemon/:pokemonName"
              element={
                <PokemonPage user={user} handleFavorite={handleFavorite} />
              }
            />

            <Route
              exact
              path="/signup"
              element={<SignupPage handleSignupOrLogin={handleSignupOrLogin} />}
            />

            <Route
              exact
              path="/login"
              element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />}
            />

            <Route
              exact
              path="/user/:id"
              element={<UserPage pokemon={allPokemon} />}
            />
          </>
        ) : (
          <h3>Loading...</h3>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
