import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Front from "./pages/front"
import Home from "./pages/home"
import Nav from "./components/navbar"
import About from "./components/about"
import Resources from "./components/resources"
import Breath from "./components/breathing"
import Questions from "./components/Questions"
const App = () => {
  const HomeLayout = () => {
    return (
      <>
        <Nav />
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Front />
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "home",
          element: <Home />
        },
        {
          path: "about",
          element: <About />
        },

      {

        path:"resources",
        element:<Resources/>
      },
      {
        path:"breathing",
        element:<Breath/>
      },
      {
        path:"questions",
        element:<Questions/>
      }


      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App