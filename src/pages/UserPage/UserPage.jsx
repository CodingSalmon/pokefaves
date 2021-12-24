import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import userService from "../../services/userService";

import "./UserPage.css";

const UserPage = (pokemon) => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const curUser = await userService.getUserById(id);
      setUser(curUser);
    })();
  }, [id]);

  return (
    <main>
      {user ? (
        <section>
          {Object.keys(user.favorites).map((type) => (
            <div key={type}>
              <p>Your favorite {type} pokemon</p>
              <Link
                to={
                  user.favorites[type]
                    ? `/pokemon/${user.favorites[type]}`
                    : `/`
                }
                className="pokemonCard"
                style={{ textTransform: "capitalize" }}
              >
                {user.favorites[type] ? user.favorites[type] : "None"}
              </Link>
            </div>
          ))}
        </section>
      ) : (
        "Loading..."
      )}
    </main>
  );
};

export default UserPage;
