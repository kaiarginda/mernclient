import { useState } from "react";
import React from "react";
const IndividualComment = ({
  comment,
  parentId,
  productId,
  allComments,
  loggedUser,
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const handleReplyTextChange = (event) => {
    setReplyText(event.target.value);
  };
  const submitReply = async (com) => {
    if (loggedUser) {
      await fetch("https://mernback-2g3e.onrender.com/api/reply", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          reply: replyText,
          parentId,
          productId,
          root: "no",
          author: loggedUser.name,
        }),
      });
    }

    setReplyText("");
    setShowReplyForm(false);
  };

  const clickHandler = () => {
    window.location.reload();
  };

  return (
    <div
      key={comment._id}
      className="border rounded-lg p-4 my-4 shadow-md transition duration-300 ease-in-out transform bg-black"
    >
      <a
        href={`/users/${comment.author}`}
        className="flex gap-1 items-center hover:underline"
      >
        {" "}
        <img
          className="h-[30px] w-[30px] rounded-full"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIMAAACDCAMAAACZQ1hUAAAAMFBMVEXk5ueutLe3vL/p6uursbS6v8Lg4uPO0dO9wsTa3d7AxMfU19mnrrHKztCxt7rGyszzzgJoAAAC4klEQVR4nO2ay3LrIAxADeJhnv7/v722m94maQwSQTQLziIzWfmMEDJIXpbJZDKZTCaTyWQymXwKsBgXbEo2GLP/+QuClyJGtRNV1smMtgCzqSjuUTHbkcEA45USv1AijVOw4oXBaSHdoFCsFwanRRohYa6CcJPQ/AquJDBGoqrAL2HqCocEZ05AxjjwJuZWTMc7Ccem4JAKQmQ2B9xKnIHYmFbDosOwSxgWBcAbHIFgcaCEQYjIoQCSosCzP02sP/ge2V8BEmkpeLJS0xSEst0VDL443Oj/1nDEdOColYGYDju9EwKwr6s7er+4wJMVVOjtQKtQH+PQe3NOh5vDSnfong+evjd7OxBPDyfdX1qfUKtRt5sHZP9DDHVjqP7NCPILg+OeQ00IjmsO8q75PwwstxzagTKyXHIMyYGnCUHKSq6bN6FEsLVBKFcMvgYEtk6xNmJwNUKtjAqAPOHzGSzIlGDsRn2R6svB37OuHmZ4ukAPQCg1rJUcoHBML/TlesRhEwwI+WUolB44UILF5udJjhKaez/8sgheHPO08/E7eRs1wnnQAGc3r7VefQoG/ma4uFv8MP7Z+49zNm3er+vq/ZZsOJNhkAosznqd1dd49ZaP56BVSL8Fdg0wYZPHwy9LlIrZB8YdaoIW14+/8xAyOZZ4hLU8VHzykL0nz7BsmXrnVcp3rBgX421MMEIvC09YhGeNLvV7Pzk1G5wW/t28ANceg2+J+OYhu6EL9cLinS8S3OtjQgO2UQICuQV1SfRtDl3W4RuVG86ZoHsq7NAluisI+qFf9lcgSkDps5t2KMvRMjhCgW+b9tyUjyiPlaA1v2gS2GLFsCV+wKVEw5QAD7JZxqmAm+6w7YlvMHuDWUHEaiDInznQqXeR6TNEKtWWWcN4n+xQmSqwZ+RBrjiQv/ZoobwYiM8j36cyhB6QDueVowT/zjwolymes8szqujg5QjKY0cYQ9FhMplMJh/IPxnNIeC/rMlZAAAAAElFTkSuQmCC"
          alt=""
        />
        <span className="text-3xl text-slate-400">{comment.author}</span>
      </a>
      <h1 className="text-lg font-bold mb-2 text-blue-800">{comment.text}</h1>
      {loggedUser.name ? (
        <button
          className="text-blue-500 hover:underline transition duration-300 ease-in-out transform "
          onClick={toggleReplyForm}
        >
          Reply
        </button>
      ) : null}
      {showReplyForm && (
        <div className="mt-4">
          <textarea
            value={replyText}
            onChange={handleReplyTextChange}
            className="w-full p-2 border rounded-md text-black"
            placeholder="Your reply..."
          />
          <button
            onClick={() => {
              submitReply(comment);
              clickHandler();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 hover:bg-blue-600 transition duration-300 ease-in-out transform "
          >
            Submit Reply
          </button>
        </div>
      )}
      {allComments.map((com) => {
        if (com.parentId === comment._id) {
          return (
            <IndividualComment
              key={com._id}
              allComments={allComments}
              parentId={com._id}
              productId={productId}
              comment={com}
              loggedUser={loggedUser}
            />
          );
        }
      })}
    </div>
  );
};

export default IndividualComment;
