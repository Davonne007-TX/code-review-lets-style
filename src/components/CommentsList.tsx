import { CommentStateContext } from "../App";
import Comment from "./Comment";
import * as React from "react";

function CommentsList() {
  const { comments } = React.useContext(CommentStateContext);

  return (
    <div className="comments-list flex flex-col max-w-3xl p-4 bg-blue-300">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentsList;
