import React from "react";
import IndividualComment from "../components/IndividualComment";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
const CommentList = ({ productId, loggedUser }) => {
  // await connectMongoDB();
  const [cookies, setCookie] = useCookies(["name"]);
  const [allComments, setAllCommments] = useState([]);
  const [comments, setComments] = useState([]);
  // const [loggedUser, setLoggedUser] = useState({});
  // useEffect(async () => {
  //   const data = await fetch("http://localhost:5000/api/commentList", {
  //     method: "POST",
  //     body: JSON.stringify({}),
  //   });

  //   console.log(data, "data from useffect in commentList");
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mernback-2g3e.onrender.com/api/commentList"
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data, "data from useffect in commentList");
          setComments(data.comments);
          setAllCommments(data.allComments);
        } else {
          console.log("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-white ">
      {comments.map((comment) => {
        if (comment.productId !== productId) {
          return null;
        }
        return (
          <div
            key={Math.random() + Date.now()}
            className="bg-white rounded-lg p-4 mt-4"
          >
            <IndividualComment
              comment={comment}
              parentId={comment._id}
              productId={productId}
              allComments={allComments}
              loggedUser={loggedUser}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
