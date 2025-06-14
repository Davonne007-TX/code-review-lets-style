import data from "../data.json";

function FormComponent(props: {
  defaultValue?: string;
  dispatchHandler: Function;
}) {
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    props.dispatchHandler(formData.get("comment") as string);

    formElement.reset();
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="form-component max-w-xs md:max-w-2xl mt-4 rounded-2xl mb-8 bg-blue-300 p-2">
        <div className="current-user">
          {/* <div className="user-img"> */}
          {/* <img
              src={data.currentUser.image.png}
              alt=""
              className="w-20 rounded-2xl"
            /> */}
          {/* </div> */}
        </div>
        <form
          action="#"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center items-center"
        >
          <h1 className="font-marker md:text-3xl">Leave a Comment:</h1>
          <img
            src={data.currentUser.image.jpg}
            alt=""
            className="w-14 rounded-2xl"
          />
          <textarea
            name="comment"
            id="comment"
            defaultValue={props.defaultValue}
            placeholder="Add a comment..."
            className="bg-white outline-purple-700 font-mono rounded text-2xl w-full h-10 p-1"
          />

          <button type="submit" className="confirm-bts text-2xl rounded ">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormComponent;
