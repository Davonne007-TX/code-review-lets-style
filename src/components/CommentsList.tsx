import { CommentStateContext } from "../App";
import Comment from "./Comment";
import * as React from "react";

function CommentsList() {
  const { comments } = React.useContext(CommentStateContext);

  return (
    <div className="comments-list max-w-4xl p-4 bg-blue-300">
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} />
      ))}
    </div>
  );
}

export default CommentsList;
