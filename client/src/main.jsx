import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "./components/ui/provider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import theme from './theme/index.js';
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Portfolio from "./Pages/Portfolio";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import { PageTrackerProvider } from "./components/statistics/PageVisitTracker.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx"; // Assuming you have an AuthContext for login state management

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: <Blog /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider>
      <AuthProvider>
        <PageTrackerProvider>
          <RouterProvider router={router} />
        </PageTrackerProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
