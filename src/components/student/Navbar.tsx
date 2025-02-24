export function Navbar() {
    return (
        <nav className="w-full fixed top-0 left-0 bg-orange-500 text-teal-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-teal-200">Smart Sage</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-teal-300 transition">Home</a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300 transition">About</a>
            </li>
            <li>
              <a href="#" className="hover:text-teal-300 transition">Contact</a>
            </li>
          </ul>
        </div>
      </nav>
      
    )
}