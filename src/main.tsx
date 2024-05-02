import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Start from "./start";
import Complete from "./complete";
import Profile from "./profile";
import "./index.css";
import ProvideAuth from "./ProvideAuth";
import { getAuth } from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/complete",
    element: <Complete />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ProvideAuth provider={getAuth()}>
    <RouterProvider router={router} />
  </ProvideAuth>
);
