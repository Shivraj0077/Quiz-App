import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              My Quiz App
            </h2>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 text-center mt-12">
          Hello
        </h1>
      </main>
    </div>
  );
};

export default Home;