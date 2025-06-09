import ScoreComponent from "./subcomponents/ScoreComponent";
import Reply from "./Reply";
import Card from "./Card";
import type { UserComment } from "../App";

function Comment(props: { comment: UserComment }) {
  return (
    <div className="comment-wrapper font-thin font-serif text-xl">
      <Card item={props.comment}>
        <div className="flex flex-col gap-1 p-1 bg-blue-300">
          <p className="comment-date text-md">{props.comment.createdAt}</p>
          <p>{props.comment.content}</p>
          <ScoreComponent score={props.comment.score} />
        </div>
      </Card>

      <div className="replies-list">
        {props.comment.replies.map((reply) => (
          <Reply reply={reply} key={reply.id} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
