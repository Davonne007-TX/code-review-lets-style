function Button(props: {
  iconImage: string;
  label: string;
  clickHandler: React.MouseEventHandler;
}) {
  return (
    <button onClick={props.clickHandler} className="p-1">
      <div className="icon-img">
        <img src={props.iconImage} alt="w-80" />
      </div>

      {props.label}
    </button>
  );
}

export default Button;
