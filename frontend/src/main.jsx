import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./i18n.js";

import {
  AdminPanel,
  Home,
  Internships,
  Jobs,
  Login,
  Profile,
  SignUp,
  Subscriptions,
} from "./pages/index.js";
import App from "./App.jsx";
import "./index.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/jobs",
        element: <Jobs />,
      },
      {
        path: "/internships",
        element: <Internships />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/subscriptions",
        element: <Subscriptions />,
      },
      {
        path: "/adminPanel",
        element: <AdminPanel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={"loading..."}>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </Suspense>
  </StrictMode>
);
