import data from "../../data.json";

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
      <div className="user bg-blue-500 p-2 flex flex-col gap-1">
        <span className="comment-date text-md">{props.date}</span>
        {/* Avatar */}
        <div className="user-image">
          <img
            src={props.avatar}
            alt="User avatar"
            className="w-10 md:w-20 rounded-2xl"
          />
        </div>

        {/* Text Info */}
        <div className="user-info flex items-center gap-4 flex-wrap max-w-sm">
          <h3 className="font-semibold font-marker text-xl">
            {props.username}
          </h3>

          {isCurrentUser && (
            <span className="current-user bg-blue-100 text-blue-600 text-2xl font-semibold px-2 py-1 rounded">
              you
            </span>
          )}
          {/* <span className="comment-date text-black text-md">{props.date}</span> */}
        </div>
      </div>

      {/* Action Buttons or Children */}
      <div className="actions">{props.children}</div>
    </div>
  );
}

export default ProfileHeader;
