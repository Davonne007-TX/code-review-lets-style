// import Header from "./Header";
export default function TopSection() {
  return (
    <>
      {/* <Header /> */}
      <div className=" p-1 font-bold flex flex-col gap-1 mt-4 ">
        <h1 className="text-4xl bg-blue-500 font-marker p-0.5">
          HD's Friends Comments
        </h1>
        <p className="font-thin bg-white p-0.5 text-2xl font-mono">
          Displaying 4 comments out of 4 comments
        </p>
      </div>
    </>
  );
}
