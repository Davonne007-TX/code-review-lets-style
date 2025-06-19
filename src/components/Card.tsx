import * as React from "react";

import Button from "./subcomponents/Button";
import FormComponent from "./FormComponent";
import { CommentStateContext, currentUser } from "../App";
import type { UserComment, UserReply } from "../App";
import Online from "./subcomponents/Online";

const CurrentUserActions = (props: {
  handleEditClick: React.MouseEventHandler;
  handleDeleteClick: React.MouseEventHandler;
}) => (
  <>
    <div className="mt-4">
      <Button
        label="Edit"
        iconImage="/images/icon-edit.svg"
        clickHandler={props.handleEditClick}
      />
      <div className="flex items-center">
        <div>🗑️</div>
        <Button
          label="Delete"
          iconImage="/images/icon-delete.svg" // ****
          clickHandler={props.handleDeleteClick}
        />
      </div>
    </div>
  </>
);

function Card(props: {
  item: UserComment | UserReply;
  children: React.ReactNode;
  avatar: string;
}) {
  const [isReplying, setIsReplying] = React.useState(false);
  const [isEditting, setIsEditting] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(true);
  const { dispatch } = React.useContext(CommentStateContext);

  const isCurrentUser = currentUser.username === props.item.user.username;

  return (
    <div className="container outline-2 outline-white transition-opacity duration-500 ease-in opacity-100">
      <div className="card">
        <div className="content flex flex-col md:flex-row">
          <button
            onClick={() =>
              dispatch({
                type: "UP_VOTE",
                id: props.item.id,
              })
            }
          >
            <div className="icon-img">
              <img
                src="/interactive-comment-section/images/icon-plus.svg"
                alt=""
              />
            </div>
          </button>

          {/* <span>{props.item.score}</span> */}

          <button
            onClick={() =>
              dispatch({
                type: "DOWN_VOTE",
                id: props.item.id,
              })
            }
          >
            <div className="icon-img">
              <img
                src="/interactive-comment-section/images/icon-minus.svg"
                alt=""
              />
            </div>
          </button>
        </div>

        <div className="content flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="profile-header">
            <div className="user flex flex-col">
              <div className="user-img bg-blue-500 text-center h-20">
                <img
                  src={props.item.user.image.jpg}
                  alt="avatar"
                  className="w-14 p-2"
                />

                <h3 className="font-marker text-2xl md:text-3xl">
                  {props.item.user.username}
                </h3>
                <Online />

                {isCurrentUser && (
                  <span className="current-use font-marker">Reply Guy!</span>
                )}

                {/* <span className="comment-date">{props.item.createdAt}</span> */}
              </div>
            </div>

            <div className="actions bg-blue-500 p-4">
              {isCurrentUser ? (
                <CurrentUserActions
                  handleEditClick={() => setIsEditting((prev) => !prev)}
                  handleDeleteClick={() => setIsHidden(false)}
                />
              ) : (
                <button
                  onClick={() => setIsReplying((prev) => !prev)}
                  className="font-mono text-xl hover:scale-105 text-purple-700 font-bold"
                >
                  <div className="icon-img">
                    {/* <img src="/images/icon-reply.svg" alt="" /> */}
                  </div>
                  Reply ↩️
                </button>
              )}
            </div>
          </div>

          {props.children}
        </div>
      </div>

      {isReplying && (
        <FormComponent
          placeholderValue="Add a reply..."
          dispatchHandler={(content: string) => {
            dispatch({
              type: "ADD_REPLY",
              id: props.item.id,
              payload: content,
            });

            setIsReplying(false);
          }}
        />
      )}

      {isEditting && (
        <FormComponent
          placeholderValue="Edit a comment..."
          value={props.item.content}
          dispatchHandler={(content: string) => {
            dispatch({
              type: "EDIT",
              id: props.item.id,
              payload: content,
            });

            setIsEditting(false);
          }}
        />
      )}

      {!isHidden && (
        <div className="modal-container text-2xl flex flex-col gap-2 p-2">
          <h3 className="font-marker">Delete comment</h3>
          <p>
            Are you sure you want to delete this comment? This will remove the
            comment and can't be undone.
          </p>

          <div className="buttons flex gap-2">
            <button
              className="cancel confirm-bts"
              onClick={() => setIsHidden(true)}
            >
              No, Cancel
            </button>
            <button
              className="confirm confirm-bts"
              onClick={() => dispatch({ type: "DELETE", id: props.item.id })}
            >
              Yes, Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
