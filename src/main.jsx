import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Homepage from "./Homepage.jsx";
import EventsPage from "./EventsPage.jsx";
import CreateEvent from "./Createevent.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import LandingPage from "./LoadingPage.jsx";
import Event from "./Event.jsx";
import Checkout from "./Checkout.jsx";
import OrgEvent from "./OrgEvent.jsx";
import Footer from "./Footer.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains Navbar and acts as layout
    children: [
      { path: "", element: <LandingPage /> },
      { path: "", element: <Homepage /> },
      { path: "events", element: <EventsPage /> },
      { path: "create", element: <CreateEvent /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "event", element: <Event /> },

      { path: "checkout", element: <Checkout /> },
      { path: "footer", element: <Footer /> },
      { path: "orgevent", element: <OrgEvent /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
