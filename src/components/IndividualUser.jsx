import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import IndividualRecipe from "./IndividualRecipe";
import { Link } from "react-router-dom";
const IndividualUser = () => {
  const url = window.location.href;

  const name = url.split("/")[4];
  const [user, setUser] = useState({});
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});
  const [follows, setFollows] = useState(false);
  const [cookies] = useCookies(["name"]);
  const [favourites, setFavourites] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const userData = await response.json();
        if (userData.user) {
          setUser(userData.user);
          setFollowers(userData.user.followers);
          setFollowing(userData.user.following);
          // setFavourites(userData.user.favourites);
        } else {
          console.log("User not found");
        }
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchLoggedUser = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          "Content-Type": "application/json", // Add this line to specify the content type
        },
        credentials: "include",
        xhrFields: {
          withCredentials: true,
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        const userData = await response.json();
        if (userData.loggedUser) {
          // console.log(userData);
          setLoggedUser(userData.loggedUser);
          setFollowers(userData.user.followers);
          setFollowing(userData.user.following);
          setUser(userData.user);
          setFollows(userData.follows);
        } else {
          console.log("User not found");
        }
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserFavourites = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/get-other-favourites",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Add this line to specify the content type
          },
          credentials: "include",
          xhrFields: {
            withCredentials: true,
          },
          body: JSON.stringify({ name }),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        // console.log(userData);
        setFavourites(userData.favourites);
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  console.log(favourites);
  useEffect(() => {
    fetchData();
    fetchLoggedUser();
    fetchUserFavourites();
  }, [url, cookies, name, follows]);

  const openFollowersModal = () => {
    setShowFollowersModal(true);
  };

  const closeFollowersModal = () => {
    setShowFollowersModal(false);
  };

  const openFollowingModal = () => {
    setShowFollowingModal(true);
  };

  const closeFollowingModal = () => {
    setShowFollowingModal(false);
  };

  const followHandler = async () => {
    if (follows) {
      try {
        const response = await fetch("http://localhost:5000/api/unfollow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loggedName: loggedUser.name, user }),
        });

        if (response.ok) {
          const data = await response.json();
          window.location.reload();

          return;
        } else {
          console.log("Request failed with status:", response.status);
          window.location.reload();

          return;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        window.location.reload();

        return;
      }
    }
    try {
      const response = await fetch("http://localhost:5000/api/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ loggedName: loggedUser.name, user }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    window.location.reload();
  };

  console.log(follows);
  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto bg-white rounded-md shadow-md overflow-hidden">
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                // src={user.profileImage || "default-profile-image.jpg"}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAMFBMVEXk5ueutLe3vL/p6uursbS6v8Lg4uPO0dO9wsTa3d7AxMfU19mnrrHKztCxt7rGyszzzgJoAAAC4klEQVR4nO2ay3LrIAxADeJhnv7/v722m94maQwSQTQLziIzWfmMEDJIXpbJZDKZTCaTyWQymXwKsBgXbEo2GLP/+QuClyJGtRNV1smMtgCzqSjuUTHbkcEA45USv1AijVOw4oXBaSHdoFCsFwanRRohYa6CcJPQ/AquJDBGoqrAL2HqCocEZ05AxjjwJuZWTMc7Ccem4JAKQmQ2B9xKnIHYmFbDosOwSxgWBcAbHIFgcaCEQYjIoQCSosCzP02sP/ge2V8BEmkpeLJS0xSEst0VDL443Oj/1nDEdOColYGYDju9EwKwr6s7er+4wJMVVOjtQKtQH+PQe3NOh5vDSnfong+evjd7OxBPDyfdX1qfUKtRt5sHZP9DDHVjqP7NCPILg+OeQ00IjmsO8q75PwwstxzagTKyXHIMyYGnCUHKSq6bN6FEsLVBKFcMvgYEtk6xNmJwNUKtjAqAPOHzGSzIlGDsRn2R6svB37OuHmZ4ukAPQCg1rJUcoHBML/TlesRhEwwI+WUolB44UILF5udJjhKaez/8sgheHPO08/E7eRs1wnnQAGc3r7VefQoG/ma4uFv8MP7Z+49zNm3er+vq/ZZsOJNhkAosznqd1dd49ZaP56BVSL8Fdg0wYZPHwy9LlIrZB8YdaoIW14+/8xAyOZZ4hLU8VHzykL0nz7BsmXrnVcp3rBgX421MMEIvC09YhGeNLvV7Pzk1G5wW/t28ANceg2+J+OYhu6EL9cLinS8S3OtjQgO2UQICuQV1SfRtDl3W4RuVG86ZoHsq7NAluisI+qFf9lcgSkDps5t2KMvRMjhCgW+b9tyUjyiPlaA1v2gS2GLFsCV+wKVEw5QAD7JZxqmAm+6w7YlvMHuDWUHEaiDInznQqXeR6TNEKtWWWcN4n+xQmSqwZ+RBrjiQv/ZoobwYiM8j36cyhB6QDueVowT/zjwolymes8szqujg5QjKY0cYQ9FhMplMJh/IPxnNIeC/rMlZAAAAAElFTkSuQmCC"
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="ml-4">
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <div className="flex mt-1">
                <p
                  className="text-sm text-gray-600 cursor-pointer"
                  onClick={openFollowersModal}
                >
                  Followers: {followers.length || 0}
                </p>
                <p
                  className="ml-4 text-sm text-gray-600 cursor-pointer"
                  onClick={openFollowingModal}
                >
                  Following: {following.length || 0}
                </p>
              </div>
            </div>
          </div>

          {name === loggedUser.name ? null : follows ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={followHandler}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={followHandler}
            >
              Follow
            </button>
          )}
          {/* {follows ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={followHandler}
            >
              Unfollow
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={followHandler}
            >
              Follow
            </button>
          )} */}
        </div>
      </div>

      {/* Followers Modal */}
      {showFollowersModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Followers</h2>
            <ul>
              {user.followers.map((follower) => (
                <li key={follower._id} className="mb-2">
                  <a href={`/users/${follower.name}`}> {follower.name}</a>
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={closeFollowersModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Following Modal */}
      {showFollowingModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Following</h2>
            <ul>
              {user.following.map((followed) => (
                <li key={followed._id} className="mb-2">
                  <a href={`/users/${followed.name}`}> {followed.name}</a>
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4"
              onClick={closeFollowingModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* <div>
        {typeof (favourites[0] == "object")
          ? favourites.map((item) => {
              return (
                <IndividualRecipe
                  title={item.title}
                  ingredients={item.ingredients}
                  description={item.description}
                  image={`http://localhost:5000/uploads/${item.image}`}
                  recipe={item}
                />
              );
            })
          : null}
      </div> */}
      <div className="flex flex-col items-center">
        {" "}
        <h1 className="pt-10 text-3xl">{user.name}'s Favourites:</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
          {favourites.map((item) => (
            <IndividualRecipe
              key={item._id}
              title={item.title}
              ingredients={item.ingredients}
              description={item.description}
              image={`http://localhost:5000/uploads/${item.image}`}
              recipe={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndividualUser;
