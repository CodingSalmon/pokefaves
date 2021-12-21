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
  const { pokemonName } = useParams();

  const [pokemon, setPokemon] = useState({});
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    msg: "",
    pokemonName: pokemonName,
  });

  useEffect(() => {
    (async () => {
      const pokemonDetails = await getPokemonDetails(pokemonName);
      const comments = await getComments(pokemonName);
      setPokemon(pokemonDetails);
      setComments(comments);
    })();
  }, [pokemonName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addComment = async (e) => {
    e.preventDefault();
    const newComment = await createComment(formData);
    setComments([...comments, newComment]);
    setFormData({ ...formData, msg: "" });
  };

  const updateComment = async (id) => {};

  const deleteComment = async (id) => {
    await removeComment(id);
    setComments(comments.filter((comment) => comment._id !== id));
  };

  return (
    <div className="PokemonPage">
      {pokemon.name ? (
        <div>
          <div className="PokemonPage-image">
            <span>
              <img height="250" src={pokemon.sprites.front_default} alt="" />
            </span>
          </div>

          <div className="content">
            <div className="PokemonPage-details">
              <span>Name:</span>
              <span style={{ textTransform: "capitalize" }}>
                {pokemon.name}
              </span>
              <span>Type(s):</span>
              <span>
                {pokemon.types.map((type, idx) => (
                  <div key={idx} style={{ textTransform: "capitalize" }}>
                    {type.type.name}
                  </div>
                ))}
              </span>
              <span>Height:</span>
              <span>
                {Math.floor(pokemon.height / 3.048)} ft.{" "}
                {Math.ceil(
                  12 *
                    (pokemon.height / 3.048 -
                      Math.floor(pokemon.height / 3.048))
                )}{" "}
                in.
              </span>
              <span>Weight:</span>
              <span>{Math.ceil(pokemon.weight / 4.536)} lbs.</span>
              <span>Abilities:</span>
              <span>
                {pokemon.abilities.map((ability, idx) => (
                  <div key={idx} style={{ textTransform: "capitalize" }}>
                    {ability.ability.name}
                  </div>
                ))}
              </span>
              <span>Base HP:</span>
              <span>{pokemon.stats[5].base_stat}</span>
              <span>Base Attack:</span>
              <span>{pokemon.stats[4].base_stat}</span>
              <span>Base Defense:</span>
              <span>{pokemon.stats[3].base_stat}</span>
              <span>Base Special-Attack:</span>
              <span>{pokemon.stats[2].base_stat}</span>
              <span>Base Special-Defense:</span>
              <span>{pokemon.stats[1].base_stat}</span>
              <span>Base Speed:</span>
              <span>{pokemon.stats[0].base_stat}</span>
              <Link to="/" className="btn">
                Back to Index
              </Link>
              {user ? (
                <span className="favs">
                  {pokemon.types.map((type, idx) => (
                    <button
                      key={idx}
                      className="fav btn"
                      onClick={() => handleFavorite(type.type.name, pokemon)}
                    >
                      {user.favorites[`${type.type.name}`] !== pokemon.name
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
                    name="msg"
                    onChange={handleChange}
                    placeholder="Your text here"
                    value={formData.msg}
                  ></input>
                  <input type="submit" className="btn" />
                </form>
              ) : (
                ""
              )}

              <h3>Comments</h3>
              {comments.length ? (
                comments.map((comment, idx) => (
                  <div className="comment" key={idx}>
                    <span>Comment:</span>
                    <span>{comment.msg}</span>
                    <span>Posted By:</span>
                    <span>{comment.posterName}</span>
                    <span></span>
                    {user && user._id === comment.postedBy ? (
                      <div>
                        <input
                          type="submit"
                          value="UPDATE"
                          className="btn"
                          onClick={() => updateComment(comment._id)}
                        />
                        <input
                          type="submit"
                          value="DELETE"
                          className="btn"
                          onClick={() => deleteComment(comment._id)}
                        />
                      </div>
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
