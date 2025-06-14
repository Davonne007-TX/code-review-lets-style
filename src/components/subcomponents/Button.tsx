function Button(props: {
  iconImage: string;
  label: string;

  clickHandler: React.MouseEventHandler;
}) {
  return (
    <div className="">
      <button
        onClick={props.clickHandler}
        className="font-mono hover:underline"
      >
        <div className="icon-img ">
          <img src={props.iconImage} alt="w-80" />
        </div>
        {props.label}
      </button>
    </div>
  );
}

export default Button;
