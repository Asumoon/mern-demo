import React from "react";
import { Outlet } from "react-router-dom";

const Movie: React.FC = () => { 
  return (
    <div className="bg-slate-200">
      <div className="container mx-auto p-2">
        <div className="text-center bg-slate-300 p-4">
          <h2 className="text-xl font-bold">Movie Lists</h2>
        </div>
      </div>
      <div>
        <Outlet /> {/* This is where nested routes will be rendered */}
      </div>
    </div>
  );
};

export default Movie;
