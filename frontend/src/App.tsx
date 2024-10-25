import { useState, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Sidebar from "./layouts/Sidebar";
import AppRoute from "./routes";

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);

  return (
    <Router>
      <div className="relative min-h-screen md:flex">
        {/* Sidemenu */}
        <Sidebar setExpand={setSideMenuIsExpand} />

        {/* Content Section */}
        <div
          className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${
            sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
          }`}
        >
          {/* Loading Pre identifier */}
          <Suspense
            fallback={<div className="max-w-md m-auto mt-32">Loading...</div>}
          >
            {/* Main Route */}
            <AppRoute />
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
