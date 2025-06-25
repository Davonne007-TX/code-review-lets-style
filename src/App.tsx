import * as React from "react";

import Header from "./components/subcomponents/Header";
import CommentsList from "./components/CommentsList";
import FormComponent from "./components/FormComponent";
import TopSection from "./components/subcomponents/TopSection";
import data from "../src/data.json";

export type UserComment = {
  id: number;
  createdAt: string;
  score: number;
  content: string;
  user: {
    username: string;
    image: {
      jpg: string;
    };
  };
  replies: UserReply[];
};

export type UserReply = Omit<UserComment, "replies"> & {
  replyingTo: string;
};

type ReducerActions = {
  type: string;
  payload?: string;
  id: number;
};

export const currentUser = data.currentUser;

export const createProps = (info: {
  user: {
    image: {
      jpg: string;
    };
    username: string;
  };
  createdAt: string;
}) => ({
  avatar: info.user.image.jpg,
  username: info.user.username,
  date: info.createdAt,
});

// Declare context with default values
export const CommentStateContext = React.createContext<{
  comments: UserComment[];
  dispatch: React.Dispatch<ReducerActions>;
}>({
  comments: data.comments,
  dispatch: () => {},
});

// Utility to find the highest ID
const getLastId = (comments: UserComment[]) =>
  Math.max(
    ...comments.map((c) => c.id),
    ...comments.flatMap((c) => c.replies.map((r) => r.id))
  );

function App() {
  const [comments, dispatch] = React.useReducer(
    (state: UserComment[], action: ReducerActions): UserComment[] => {
      const findReplyById = (comment: UserComment) =>
        comment.replies.find((reply) => reply.id === action.id);

      const editComment = (arr: any[]) =>
        arr.map((item) =>
          item.id === action.id ? { ...item, content: action.payload } : item
        );

      const parentComment = state.find((comment) => findReplyById(comment));
      const targetId = parentComment?.id || action.id;

      switch (action.type) {
        case "ADD_COMMENT":
          return [
            ...state,
            {
              id: getLastId(state) + 1,
              score: 0,
              content: action.payload || "",
              replies: [],
              createdAt: new Date().toISOString(),
              user: currentUser,
            },
          ];

        case "ADD_REPLY":
          return state.map((comment) => {
            const targetUser = parentComment
              ? findReplyById(parentComment)?.user
              : comment.user;

            if (comment.id === targetId && targetUser) {
              return {
                ...comment,
                replies: [
                  ...comment.replies,
                  {
                    id: getLastId(state) + 1,
                    score: 0,
                    user: currentUser,
                    replyingTo: targetUser.username,
                    createdAt: new Date().toISOString(),
                    content: action.payload || "",
                  },
                ],
              };
            }

            return comment;
          });

        case "UP_VOTE":
          return state.map((comment) =>
            comment.id === action.id
              ? { ...comment, score: comment.score + 1 }
              : {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === action.id
                      ? { ...reply, score: reply.score + 1 }
                      : reply
                  ),
                }
          );

        case "DOWN_VOTE":
          return state.map((comment) =>
            comment.id === action.id
              ? { ...comment, score: comment.score - 1 }
              : {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply.id === action.id
                      ? { ...reply, score: reply.score - 1 }
                      : reply
                  ),
                }
          );

        case "EDIT":
          if (parentComment) {
            return state.map((comment) =>
              comment.id === parentComment.id
                ? {
                    ...comment,
                    replies: editComment(comment.replies),
                  }
                : comment
            );
          }
          return editComment(state);

        case "DELETE":
          const newState = state.filter((comment) => comment.id !== action.id);
          if (newState.length !== state.length) return newState;

          return state.map((comment) => ({
            ...comment,
            replies: comment.replies.filter((reply) => reply.id !== action.id),
          }));

        default:
          return state;
      }
    },
    data.comments
  );

  return (
    <div className="">
      <CommentStateContext.Provider value={{ comments, dispatch }}>
        <Header />
        <TopSection />
        <CommentsList />
        <FormComponent
          placeholderValue="Add a comment..!"
          dispatchHandler={(content: string) =>
            dispatch({
              type: "ADD_COMMENT",
              payload: content,
              id: 0,
            })
          }
        />
      </CommentStateContext.Provider>
    </div>
  );
}

export default App;
