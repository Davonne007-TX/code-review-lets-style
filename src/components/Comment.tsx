import ScoreComponent from "./subcomponents/ScoreComponent";
import Reply from "./Reply";
import Card from "./Card";
import type { UserComment } from "../App";

function Comment(props: { comment: UserComment }) {
  return (
    <div className="comment-wrapper font-thin font-serif text-xl">
      <Card item={props.comment} avatar={props.comment.avatar}>
        {" "}
        <div className="bg-blue-300 text-xl">
          <div className="w-full p-1 flex flex-col gap-2 font-mono">
            <p className="comment-date font-bold text-md">
              {props.comment.createdAt}
            </p>
            <p>{props.comment.content}</p>
            <ScoreComponent score={props.comment.score} />
          </div>
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
