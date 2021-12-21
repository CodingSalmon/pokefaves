import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./PokemonPage.css";

import { getPokemonDetails } from "../../services/pokemon-api";
import {
  getComments,
  createComment,
  removeComment,
} from "../../services/comment-api";

const PokemonPage = ({ user, handleFavorite }) => {
  const [state, setState] = useState({
    pokemon: {},
    comments: [],
    formData: {
      msg: "",
      pokemonName: "",
    },
  });

  const { pokemonName } = useParams();

  useEffect(() => {
    (async () => {
      const pokemon = await getPokemonDetails(pokemonName);
      const comments = await getComments(pokemonName);
      setState({ pokemon, comments, formData: { pokemonName: pokemon.name } });
    })();
  }, [pokemonName]);

  const handleChange = (e) => {
    const formData = { ...state.formData, [e.target.name]: e.target.value };
    setState({ formData });
  };

  const addComment = async (e) => {
    e.preventDefault();
    const comment = await createComment(state.formData);
    setState({
      ...state,
      comments: [...state.comments, comment],
      formData: { msg: "", pokemonName: state.pokemon.name },
    });
  };

  const deleteComment = async (id) => {
    await removeComment(id);
    setState({
      ...state,
      comments: state.comments.filter((comment) => comment._id !== id),
    });
  };
  console.log(user, "test");
  return (
    <div className="PokemonPage">
      {state.pokemon.name ? (
        <div>
          <div className="PokemonPage-image">
            <span>
              <img
                height="250"
                src={state.pokemon.sprites.front_default}
                alt=""
              />
            </span>
          </div>

          <div className="content">
            <div className="PokemonPage-details">
              <span>Name:</span>
              <span style={{ textTransform: "capitalize" }}>
                {state.pokemon.name}
              </span>
              <span>Type(s):</span>
              <span>
                {state.pokemon.types.map((type, idx) => (
                  <div key={idx} style={{ textTransform: "capitalize" }}>
                    {type.type.name}
                  </div>
                ))}
              </span>
              <span>Height:</span>
              <span>
                {Math.floor(state.pokemon.height / 3.048)} ft.{" "}
                {Math.ceil(
                  12 *
                    (state.pokemon.height / 3.048 -
                      Math.floor(state.pokemon.height / 3.048))
                )}{" "}
                in.
              </span>
              <span>Weight:</span>
              <span>{Math.ceil(state.pokemon.weight / 4.536)} lbs.</span>
              <span>Abilities:</span>
              <span>
                {state.pokemon.abilities.map((ability, idx) => (
                  <div key={idx} style={{ textTransform: "capitalize" }}>
                    {ability.ability.name}
                  </div>
                ))}
              </span>
              <span>Base HP:</span>
              <span>{state.pokemon.stats[5].base_stat}</span>
              <span>Base Attack:</span>
              <span>{state.pokemon.stats[4].base_stat}</span>
              <span>Base Defense:</span>
              <span>{state.pokemon.stats[3].base_stat}</span>
              <span>Base Special-Attack:</span>
              <span>{state.pokemon.stats[2].base_stat}</span>
              <span>Base Special-Defense:</span>
              <span>{state.pokemon.stats[1].base_stat}</span>
              <span>Base Speed:</span>
              <span>{state.pokemon.stats[0].base_stat}</span>
              <Link to="/" className="btn">
                Back to Index
              </Link>
              {user ? (
                <span className="favs">
                  {state.pokemon.types.map((type, idx) => (
                    <button
                      key={idx}
                      className="fav btn"
                      onClick={() =>
                        handleFavorite(type.type.name, state.pokemon)
                      }
                    >
                      {user.favorites[`${type.type.name}`] !==
                      state.pokemon.name
                        ? `Make your favorite ${type.type.name} pokemon`
                        : `Get rid of my favorite ${type.type.name} pokemon`}
                    </button>
                  ))}
                </span>
              ) : (
                ""
              )}
            </div>

            <div className="commentArea">
              {user ? (
                <form className="commentForm" onSubmit={addComment}>
                  <h4>Add Comment</h4>
                  <input
                    type="text"
                    name="msg"
                    onChange={handleChange}
                    placeholder="Your text here"
                  ></input>
                  <input type="submit" className="btn" />
                </form>
              ) : (
                ""
              )}

              <h3>Comments</h3>
              {state.comments.length ? (
                state.comments.map((comment, idx) => (
                  <div className="comment" key={idx}>
                    <span>Comment:</span>
                    <span>{comment.msg}</span>
                    <span>Posted By:</span>
                    <span>{comment.posterName}</span>
                    <span></span>
                    {user && user._id === comment.postedBy ? (
                      <input
                        type="submit"
                        value="DELETE"
                        className="btn"
                        onClick={() => deleteComment(comment._id)}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                ))
              ) : (
                <h4>No Comments Yet</h4>
              )}
            </div>
          </div>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default PokemonPage;
