import Quiz from "./Quiz";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Welcome to your dashboard!
        </h2>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <Quiz />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;