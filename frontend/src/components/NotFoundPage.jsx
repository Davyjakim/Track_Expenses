import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-white">404</h1>
        <h2 className="text-3xl font-semibold text-white mt-4">Page Not Found</h2>
        <p className="text-lg text-white mt-2">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 inline-block bg-white text-indigo-600 py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
