import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage"; // Import the HomePage component
import Notfound from "./components/Notfoundpage" // Import the existing 404 error page component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define the HomePage route */}
          <Route path="/" element={<HomePage />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<Notfound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
