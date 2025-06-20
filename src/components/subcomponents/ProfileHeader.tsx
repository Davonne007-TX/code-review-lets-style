import data from "../../data.json";
import Online from "./Online";

function ProfileHeader(props: {
  avatar: string;
  username: string;
  date: string;
  children: React.ReactNode;
}) {
  const isCurrentUser = data.currentUser.username === props.username;

  return (
    <div className="profile-header flex flex-col">
      {/* User Info Row */}
      <div className="user bg-blue-500 flex flex-col justify-center items-center">
        {/* <span className="comment-date text-md">{props.date}</span> */}
        {/* Avatar */}
        <div className="user-image">
          <img src={props.avatar} alt="User avatar" className="w-24" />
        </div>

        {/* Text Info */}
        <div className="user-info flex flex-col gap-1">
          <h3 className="font-semibold font-marker text-2xl text-center">
            {props.username}
          </h3>
          <Online />
          {isCurrentUser && (
            <span className="current-user text-center max-w-xs bg-blue-100 text-blue-600 text-2xl font-semibold rounded">
              Reply Guy!
            </span>
          )}{" "}
          {/* <span className="comment-date text-black text-md">{props.date}</span> */}
        </div>
      </div>

      {/* Action Buttons or Children */}
      <div className="actions">{props.children}</div>
    </div>
  );
}

export default ProfileHeader;
