import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Join = React.lazy(() => import("./Join"));
const Chat = React.lazy(() => import("./Chat"));

const App = () => {
  console.log("Loaded APP");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <React.Suspense
              fallback={
                <div>
                  <h1>LOADING....</h1>
                </div>
              }
            >
              <Join />
            </React.Suspense>
          }
        />
        <Route
          path="/chat"
          exact
          element={
            <React.Suspense
              fallback={
                <div>
                  <h1>LOADING....</h1>
                </div>
              }
            >
              <Chat location={location} />
            </React.Suspense>
          }
        />
      </Routes>
    </Router>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
