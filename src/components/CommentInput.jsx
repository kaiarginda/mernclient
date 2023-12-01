import React, { useEffect, useState } from "react";
const CommentInput = ({ postID, author }) => {
  const [comment, setComment] = useState("");
  const [reload, setReload] = useState(false);
  useEffect(() => {
    setReload(false);
  }, [reload, postID]);
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    setReload(true);
    await fetch("https://mernback-2g3e.onrender.com/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment,
        postID,
        parentId: Date.now() + Math.random(),
        onroot: "root",
        author,
      }),
    });
    setComment("");
  };

  const clickHandler = () => {
    window.location.reload();
  };

  return (
    // <div>
    //   <form
    //     onSubmit={formSubmitHandler}
    //     className="bg-white p-4 rounded-md shadow-md"
    //   >
    //     <input
    //       type="text"
    //       value={comment}
    //       onChange={(e) => setComment(e.target.value)}
    //       className="w-full px-4 py-2 text-gray-950 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
    //       placeholder="Add a comment..."
    //     />
    //     <button
    //       type="submit"
    //       className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
    //     >
    //       SUBMIT
    //     </button>
    //   </form>
    // </div>
    <div className="w-[100%]">
      <form
        onSubmit={formSubmitHandler}
        className="bg-white p-4 rounded-md shadow-md"
      >
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 text-gray-950 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
          placeholder="Add a comment..."
        />
        <button
          onClick={clickHandler}
          type="submit"
          className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
