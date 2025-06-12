import { CommentStateContext } from "../App";
import Comment from "./Comment";
import * as React from "react";

function CommentsList() {
  const { comments } = React.useContext(CommentStateContext);

  return (
    <div className="comments-list flex flex-col justify-center items-center">
      <div className=" max-w-lg md:max-w-3xl p-2 bg-blue-300">
        {comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
}

export default CommentsList;
