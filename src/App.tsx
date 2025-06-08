import * as React from "react";
import CommentsList from "./components/CommentsList";
import FormComponent from "./components/FormComponent";
import TopSection from "./components/subcomponents/TopSection";
import data from "../src/data.json";

export type UserComment = {
  id: number;
  createdAt: string;
  date: string;
  score: number;
  content: string;
  user: {
    username: string;
    image: {
      png: string;
      webp: string;
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
      png: string;
    };
    username: string;
  };
  createdAt: string;
}) => ({
  avatar: info.user.image.png,
  username: info.user.username,
  date: info.createdAt,
});

const dispatch: React.ActionDispatch<[action: ReducerActions]> = () => {};

// Make a recursive function that loops over the comments/arrays to find the one with the highest ID.

const getLastId = (comments: UserComment[]) =>
  Math.max.apply(null, [
    ...comments.map((it) => it.id),
    ...comments.map((it) =>
      Math.max.apply(
        null,
        it.replies.map((it) => it.id)
      )
    ),
  ]);

function App() {
  const [comments, dispatch] = React.useReducer((state, action) => {
    const findReplyById = (comment: UserComment) =>
      comment.replies.find((reply) => reply.id === action.id);

    const editComment = (arr: any[]) =>
      arr.map((item) => {
        if (item.id == action.id)
          return {
            ...item,
            content: action.payload,
          };

        return item;
      });

    const parentComment = state.find((comment) => findReplyById(comment));
    const targetId = parentComment?.id || action.id;

    switch (action.type) {
      case "ADD_COMMENT":
        return [
          ...state,
          {
            id: getLastId(state) + 1,
            score: 0,
            content: action.payload,
            replies: [],
            createdAt: "now",
            user: currentUser,
          },
        ];

      case "ADD_REPLY":
        return state.map((comment) => {
          const targetUser = parentComment
            ? findReplyById(parentComment)?.user
            : comment.user;

          if (comment.id === targetId && targetUser)
            return {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: getLastId(state) + 1,
                  score: 0,
                  user: currentUser,
                  replyingTo: targetUser.username,
                  createdAt: "now",
                  content: action.payload,
                },
              ],
            };

          return comment;
        });

      case "EDIT":
        if (parentComment) {
          return state.map((comment) => {
            if (!(parentComment.id == comment.id)) return comment;

            return {
              ...comment,
              replies: editComment(comment.replies),
            };
          });
        }

        return editComment(state);

      default:
        return state;
    }
  }, data.comments);

  return (
    <div className="">
      <CommentStateContext.Provider
        value={{
          comments,
          dispatch,
        }}
      >
        <TopSection />
        <CommentsList />

        <FormComponent
          dispatchHandler={(content: string) =>
            dispatch({
              type: "ADD_COMMENT",
              payload: content,
            })
          }
        />
      </CommentStateContext.Provider>
    </div>
  );
}

export const CommentStateContext = React.createContext({
  comments: data.comments,
  dispatch,
});

export default App;
