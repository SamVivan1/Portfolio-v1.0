export default function Footer() {
  return (
    <footer className="bg-gray-900 shadow-lg">
      <div className="max-w-4xl mx-auto py-8 flex flex-col items-center">
        {/* Social Icons */}
        <div className="flex gap-6 mb-6">
          <span className="bg-gray-800 rounded-full p-4 text-2xl text-white hover:bg-gray-700 cursor-pointer">
            📸
          </span>
          <span className="bg-gray-800 rounded-full p-4 text-2xl text-white hover:bg-gray-700 cursor-pointer">
            📸
          </span>
          <span className="bg-gray-800 rounded-full p-4 text-2xl text-white hover:bg-gray-700 cursor-pointer">
            🐦
          </span>
          <span className="bg-gray-800 rounded-full p-4 text-2xl text-white hover:bg-gray-700 cursor-pointer">
            🟢
          </span>
          <span className="bg-gray-800 rounded-full p-4 text-2xl text-white hover:bg-gray-700 cursor-pointer">
            ▶️
          </span>
        </div>
        {/* Navigation */}
        <nav className="flex gap-10 mb-6">
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            Home
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            News
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            About
          </a>
          <a href="#" className="text-gray-300 hover:text-blue-400 transition">
            Contact
          </a>
        </nav>
      </div>
      <div className="bg-gray-950 py-3 text-center text-gray-400 text-sm">
        Copyright &copy;2025; Designed by{" "}
        <a
          target="blank"
          href="https://instagram.com/bintang.panjii/"
          className="text-blue-400 font-semibold"
        >
          SamVivan
        </a>
      </div>
    </footer>
  );
}
