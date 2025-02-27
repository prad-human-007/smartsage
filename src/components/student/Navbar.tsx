export default function Navbar() {
    return (
      <nav className="bg-teal-500 rounded-2xl shadow-md p-4 flex justify-between items-center mx-4 my-3">
        <h1 className="text-white text-2xl font-bold ml-4">Smart Sage</h1>
        <button className="bg-white text-teal-500 px-4 py-2 rounded-lg font-semibold hover:bg-teal-100 transition">
          Login
        </button>
      </nav>
    );
  }
  