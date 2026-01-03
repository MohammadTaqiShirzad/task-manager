
const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 z-50">
        <div className="relative w-12 h-12 animate-spin">
          <span className="absolute top-0 left-0 w-5 h-5 bg-gray-800 rounded-full"></span>
          <span className="absolute top-0 right-0 w-5 h-5 bg-gray-800 rounded-full"></span>
          <span className="absolute bottom-0 left-0 w-5 h-5 bg-gray-800 rounded-full"></span>
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-gray-800 rounded-full"></span>
        </div>
      </div>
    </>
  );
};

export default Loader;
