
import React from 'react';

const Loading = () => {
  return (
    <div className="absolute top-0 z-10 right-0 flex items-center justify-center w-screen h-screen bg-opacity-25 bg-black">
    <div className="flex space-x-2  animate-pulse">
      <div className="w-8 h-8 bg-blue-400 animate-bounce rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 animate-bounce rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 animate-bounce rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 animate-bounce rounded-full"></div>
    </div>
  </div>
  );
};

export default Loading;
