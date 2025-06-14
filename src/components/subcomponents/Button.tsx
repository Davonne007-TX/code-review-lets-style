function Button(props: {
  iconImage: string;
  label: string;

  clickHandler: React.MouseEventHandler;
}) {
  return (
    <button
      onClick={props.clickHandler}
      className="font-mono hover:underline btn-styles"
    >
      <div className="icon-img ">
        <img src={props.iconImage} alt="w-80" />
      </div>
      {props.label}
    </button>
  );
}

export default Button;
