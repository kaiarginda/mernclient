import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
const User = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [cookies, setCookies] = useCookies(["name"]);
  const fetchLoggedUser = async () => {
    try {
      const response = await fetch(
        "https://mern-oqur.onrender.com/api/loggedUser",
        {
          method: "POST",
          headers: {
            //   Authorization: `Bearer ${cookies.token}`,
            "Content-type": "application/json",
          },

          body: JSON.stringify({ token: cookies.token }),
        }
      );
      if (response.ok) {
        const userData = await response.json();
        setLoggedUser(userData.user);
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchLoggedUser();
  }, [cookies]);

  return (
    // <div className="flex items-center mt-10">
    //   <img
    //     className="w-10 h-10 rounded-full mr-2"
    //     src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAMFBMVEXk5ueutLe3vL/p6uursbS6v8Lg4uPO0dO9wsTa3d7AxMfU19mnrrHKztCxt7rGyszzzgJoAAAC4klEQVR4nO2ay3LrIAxADeJhnv7/v722m94maQwSQTQLziIzWfmMEDJIXpbJZDKZTCaTyWQymXwKsBgXbEo2GLP/+QuClyJGtRNV1smMtgCzqSjuUTHbkcEA45USv1AijVOw4oXBaSHdoFCsFwanRRohYa6CcJPQ/AquJDBGoqrAL2HqCocEZ05AxjjwJuZWTMc7Ccem4JAKQmQ2B9xKnIHYmFbDosOwSxgWBcAbHIFgcaCEQYjIoQCSosCzP02sP/ge2V8BEmkpeLJS0xSEst0VDL443Oj/1nDEdOColYGYDju9EwKwr6s7er+4wJMVVOjtQKtQH+PQe3NOh5vDSnfong+evjd7OxBPDyfdX1qfUKtRt5sHZP9DDHVjqP7NCPILg+OeQ00IjmsO8q75PwwstxzagTKyXHIMyYGnCUHKSq6bN6FEsLVBKFcMvgYEtk6xNmJwNUKtjAqAPOHzGSzIlGDsRn2R6svB37OuHmZ4ukAPQCg1rJUcoHBML/TlesRhEwwI+WUolB44UILF5udJjhKaez/8sgheHPO08/E7eRs1wnnQAGc3r7VefQoG/ma4uFv8MP7Z+49zNm3er+vq/ZZsOJNhkAosznqd1dd49ZaP56BVSL8Fdg0wYZPHwy9LlIrZB8YdaoIW14+/8xAyOZZ4hLU8VHzykL0nz7BsmXrnVcp3rBgX421MMEIvC09YhGeNLvV7Pzk1G5wW/t28ANceg2+J+OYhu6EL9cLinS8S3OtjQgO2UQICuQV1SfRtDl3W4RuVG86ZoHsq7NAluisI+qFf9lcgSkDps5t2KMvRMjhCgW+b9tyUjyiPlaA1v2gS2GLFsCV+wKVEw5QAD7JZxqmAm+6w7YlvMHuDWUHEaiDInznQqXeR6TNEKtWWWcN4n+xQmSqwZ+RBrjiQv/ZoobwYiM8j36cyhB6QDueVowT/zjwolymes8szqujg5QjKY0cYQ9FhMplMJh/IPxnNIeC/rMlZAAAAAElFTkSuQmCC"
    //     alt="Profile Image"
    //   />

    //   {loggedUser.name ? (
    //     <Link to={"/"} className="text-gray-800">
    //       {loggedUser.name}{" "}
    //     </Link>
    //   ) : (
    //     <Link to={"/"} className="text-gray-800">
    //       Log In/Register
    //     </Link>
    //   )}
    //   {/* <Link to={"/"} className="text-gray-800">
    //     Log In/Register
    //   </Link> */}
    // </div>
    <div className="flex items-center mt-10">
      <div className="relative">
        <img
          className="w-10 h-10 rounded-full mr-2 transition duration-300 transform hover:scale-110"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAMFBMVEXk5ueutLe3vL/p6uursbS6v8Lg4uPO0dO9wsTa3d7AxMfU19mnrrHKztCxt7rGyszzzgJoAAAC4klEQVR4nO2ay3LrIAxADeJhnv7/v722m94maQwSQTQLziIzWfmMEDJIXpbJZDKZTCaTyWQymXwKsBgXbEo2GLP/+QuClyJGtRNV1smMtgCzqSjuUTHbkcEA45USv1AijVOw4oXBaSHdoFCsFwanRRohYa6CcJPQ/AquJDBGoqrAL2HqCocEZ05AxjjwJuZWTMc7Ccem4JAKQmQ2B9xKnIHYmFbDosOwSxgWBcAbHIFgcaCEQYjIoQCSosCzP02sP/ge2V8BEmkpeLJS0xSEst0VDL443Oj/1nDEdOColYGYDju9EwKwr6s7er+4wJMVVOjtQKtQH+PQe3NOh5vDSnfong+evjd7OxBPDyfdX1qfUKtRt5sHZP9DDHVjqP7NCPILg+OeQ00IjmsO8q75PwwstxzagTKyXHIMyYGnCUHKSq6bN6FEsLVBKFcMvgYEtk6xNmJwNUKtjAqAPOHzGSzIlGDsRn2R6svB37OuHmZ4ukAPQCg1rJUcoHBML/TlesRhEwwI+WUolB44UILF5udJjhKaez/8sgheHPO08/E7eRs1wnnQAGc3r7VefQoG/ma4uFv8MP7Z+49zNm3er+vq/ZZsOJNhkAosznqd1dd49ZaP56BVSL8Fdg0wYZPHwy9LlIrZB8YdaoIW14+/8xAyOZZ4hLU8VHzykL0nz7BsmXrnVcp3rBgX421MMEIvC09YhGeNLvV7Pzk1G5wW/t28ANceg2+J+OYhu6EL9cLinS8S3OtjQgO2UQICuQV1SfRtDl3W4RuVG86ZoHsq7NAluisI+qFf9lcgSkDps5t2KMvRMjhCgW+b9tyUjyiPlaA1v2gS2GLFsCV+wKVEw5QAD7JZxqmAm+6w7YlvMHuDWUHEaiDInznQqXeR6TNEKtWWWcN4n+xQmSqwZ+RBrjiQv/ZoobwYiM8j36cyhB6QDueVowT/zjwolymes8szqujg5QjKY0cYQ9FhMplMJh/IPxnNIeC/rMlZAAAAAElFTkSuQmCC"
          alt="Profile Image"
        />
        {loggedUser.name ? (
          <div className="absolute top-0 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
        ) : null}
      </div>
      {loggedUser.name ? (
        <Link
          to={`/users/${loggedUser.name}`}
          className="text-gray-800 transition duration-300 transform hover:underline"
        >
          {loggedUser.name}{" "}
        </Link>
      ) : (
        <Link
          to={"/login"}
          className="text-gray-800 transition duration-300 transform hover:underline"
        >
          Log In/Register
        </Link>
      )}
    </div>
  );
};

export default User;
