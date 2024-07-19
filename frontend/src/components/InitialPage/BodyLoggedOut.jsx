import React from 'react';

function BodyLoggedOut() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Expense Tracker</h1>
      <p className="text-lg mb-8 text-center">
        Track your expenses effortlessly. Record your funds twice a week and stay on top of your financial game.
      </p>
      <div className="flex flex-col items-center gap-4">
        <button
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-200 transition duration-300"
          onClick={() => window.location.href = '/login'}
        >
          Log In
        </button>
        <button
          className="bg-white text-blue-500 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-200 transition duration-300"
          onClick={() => window.location.href = '/signup'}
        >
          Sign Up
        </button>
      </div>
      <div className="mt-8">
        <p className="text-center">
          Get started now to take control of your finances!
        </p>
      </div>
    </div>
  );
}

export default BodyLoggedOut;

