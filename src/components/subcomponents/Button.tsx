function Button(props: {
  iconImage: string;
  label: string;

  clickHandler: React.MouseEventHandler;
}) {
  return (
    <div className="flex gap-2">
      <button onClick={props.clickHandler} className="font-mono">
        <div className="icon-img">
          <img src={props.iconImage} alt="w-80" />
        </div>
        {props.label}
      </button>
    </div>
  );
}

export default Button;
