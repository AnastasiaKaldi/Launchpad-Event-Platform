import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Homepage from "./Homepage.jsx";
import EventsPage from "./EventsPage.jsx";
import SignIn from "./SignIn.jsx";
import SignUp from "./SignUp.jsx";
import LandingPage from "./LoadingPage.jsx";
import Event from "./Event.jsx";
import Checkout from "./Checkout.jsx";
import OrgEvent from "./OrgEvent.jsx";
import Footer from "./Footer.jsx";
import Manage from "./Manage.jsx";
import JoinedEvents from "./JoinedEvents.jsx";
import EditEvent from "./EditEvent.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "", element: <Homepage /> },
      { path: "events", element: <EventsPage /> },
      { path: "signin", element: <SignIn /> },
      { path: "signup", element: <SignUp /> },
      { path: "event/:id", element: <Event /> },

      { path: "checkout", element: <Checkout /> },
      { path: "footer", element: <Footer /> },
      { path: "orgevent", element: <OrgEvent /> },
      { path: "manage", element: <Manage /> },
      { path: "myevents", element: <JoinedEvents /> },
      { path: "edit-event/:id", element: <EditEvent /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
