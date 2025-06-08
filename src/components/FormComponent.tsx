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
      <div className="form-component max-w-3xl mt-4 mb-8 bg-blue-300 p-2 w-full">
        <div className="flex gap-4 justify-center items-center">
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
            <h1 className="font-marker text-3xl">Leave a Comment:</h1>
            <img
              src={data.currentUser.image.png}
              alt=""
              className="w-20 rounded-2xl mx-auto"
            />
            <textarea
              name="comment"
              id="comment"
              defaultValue={props.defaultValue}
              placeholder="Add a comment..."
              className="bg-white rounded text-2xl w-20 h-10 p-1 font-serif"
            ></textarea>
            <button className="font-marker ml-18 text-2xl w-20 hover:scale-105 transition-transform duration-300">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormComponent;
