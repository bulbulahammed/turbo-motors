import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-lg text-gray-600 mb-8">
        Sign up or log in to access the main dashboard.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/signup"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Home;
