import Card from "./Card";
import type { UserReply } from "../App";

function Reply({ reply }: { reply: UserReply }) {
  return (
    <div className="reply-wrapper">
      <Card item={reply}>
        <div className=" bg-blue-300 p-2 flex flex-col gap-2">
          <p className="font-mono">{reply.createdAt}</p>
          <p>
            <span className="replying-to">@{reply.replyingTo} </span>
            {reply.content}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Reply;
