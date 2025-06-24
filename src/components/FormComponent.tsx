import * as React from "react";
import data from "../data.json";

function FormComponent(props: {
  value?: string;
  placeholderValue: string;
  dispatchHandler: (comment: string) => void;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  const textAreaRef = React.createRef<HTMLTextAreaElement>();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement;
    const formData = new FormData(formElement);

    props.dispatchHandler(formData.get("comment") as string);

    formElement.reset();
  };

  // React.useEffect(() => {
  //   const textAreaElement = textAreaRef.current;
  //   textAreaElement?.focus();
  // }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="form-component max-w-xs md:max-w-2xl mt-4 rounded-2xl mb-8 bg-blue-300 p-2">
        <form
          action="#"
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 justify-center items-center"
        >
          <h1 className="font-marker md:text-3xl">Leave a Comment:</h1>
          <img
            src={data.currentUser.image.jpg}
            alt="Our Space User"
            className="w-14 rounded-2xl"
          />
          {/* <textarea
            name="comment"
            id="comment"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.defaultValue} // <-- This shows the hint text!
            className="bg-white text-black outline-purple-700 font-mono rounded text-2xl w-full h-10 p-1"
          /> */}

          <textarea
            name="comment"
            id="comment"
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholderValue}
            ref={textAreaRef}
            className="bg-white text-black outline-purple-700 font-mono rounded text-2xl w-full h-10 p-1"
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
