import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Carbon Tracker</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
