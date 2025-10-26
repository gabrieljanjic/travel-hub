import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./frontend/pages/Dashboard";
import Airport from "./frontend/pages/Airport";
import Airline from "./frontend/pages/Airline";
import Route from "./frontend/pages/Route";
import Error from "./Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Navigate to="/dashboard" /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "airports", element: <Airport /> },
      { path: "airlines", element: <Airline /> },
      { path: "routes", element: <Route /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
