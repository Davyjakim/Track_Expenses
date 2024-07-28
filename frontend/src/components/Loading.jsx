import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 z-10 right-0 left-0 flex items-center justify-center h-screen w-screen bg-opacity-30 bg-black">
      <div className="flex space-x-4 animate-pulse">
        <div className="w-8 h-8 bg-blue-500 animate-bounce-slow rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 animate-bounce-slow-1 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 animate-bounce-slow-2 rounded-full"></div>
        <div className="w-8 h-8 bg-blue-500 animate-bounce-slow-3 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loading;
