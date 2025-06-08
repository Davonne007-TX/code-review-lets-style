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
      <div className="user">
        {/* Avatar */}
        <div className="user-image">
          <img
            src={props.avatar}
            alt="User avatar"
            className=" w-40 rounded-2xl"
          />
        </div>

        {/* Text Info */}
        <div className="user-info flex items-center gap-4 flex-wrap max-w-sm">
          <h3 className="font-semibold text-gray-800">{props.username}</h3>
          {isCurrentUser && (
            <span className="current-user bg-blue-100 text-blue-600 text-xs font-semibold px-2 py-1 rounded">
              you
            </span>
          )}
          <span className="comment-date text-black text-md">{props.date}</span>
        </div>
      </div>

      {/* Action Buttons or Children */}
      <div className="actions mt-2">{props.children}</div>
    </div>
  );
}

export default ProfileHeader;
