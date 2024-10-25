import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="w-full h-full p-5">
      <div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
        <div className="font-sans">
          <span className="text-base md:text-sm text-green-500 font-bold">
            <h1 className="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">
              Welcome to Demo Blog
            </h1>
            <p className="text-sm md:text-base font-normal text-gray-600">
              Started Date 24 October 2024
            </p>
            <p className="text-sm md:text-base font-normal text-gray-600">
              Published Date 25 October 2024
            </p>
          </span>
        </div>

        <p className="py-6">
          👋 Welcome - This Demo is created with NodeJS, Express, MongoDB,
          Tailwind CSS, React and other library and online modules.
        </p>

        <div className="py-2 font-sans hover:text-blue-500 transition duration-300"> <Link to="Dashboard"> Online Live Link </Link> </div>
        <div className="py-2 font-sans hover:text-blue-500 transition duration-300"> <Link to="Dashboard"> API Documentation is available </Link> </div>
        <div className="py-2 font-sans hover:text-blue-500 transition duration-300"> React running in port : 3000 </div>
        <div className="py-2 font-sans hover:text-blue-500 transition duration-300"> Node running on port : 9000 </div>
       

        <blockquote className="border-l-4 border-green-500 italic my-8 pl-2 md:pl-4">
          Note - Please open online link for more details.
        </blockquote>

        <blockquote className="border-l-4 border-green-500 italic my-8 pl-2 md:pl-4">
        Developed By: Sundar Ghimire - 9867041839
        </blockquote>
        
      </div>
    </div>
  );
};

export default Home;
