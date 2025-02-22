import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              🎯 My Quiz App
            </h2>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Test Your Knowledge! 📚
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Challenge yourself with fun quizzes on various topics and improve your knowledge.
        </p>
        
        {/* Quiz Button */}
        <Link 
          to="/dashboard" 
          className="mt-6 inline-block bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Take Quiz 🚀
        </Link>
      </main>

      {/* Features Section */}
      <section className="mt-12 max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">Why Take Our Quizzes?</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">💡 Fun & Engaging</h3>
            <p className="text-gray-600 text-sm mt-2">
              Our quizzes are interactive and enjoyable!
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">🎯 Test Your Skills</h3>
            <p className="text-gray-600 text-sm mt-2">
              Challenge yourself with different difficulty levels.
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">📊 Track Progress</h3>
            <p className="text-gray-600 text-sm mt-2">
              View your history and improve over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
