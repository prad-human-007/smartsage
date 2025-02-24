export function Navbar() {
    return (
        <nav className="flex flex-row max-w-[120rem] w-full justify-between border rounded-xl p-4">
            <div className="">SMARTSAGE {' > '} School Name {' > '} Hello Prad!! </div>
            <ul className="flex space-x-4">
                <li><a href="#" className="">Home</a></li>
                <li><a href="#" className="">About</a></li>
                <li><a href="#" className="">Contact</a></li>
            </ul>
        </nav>
    )
}