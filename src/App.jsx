import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom"
import Front from "./pages/front"
import Home from "./pages/home"
import Nav from "./components/navbar"
import About from "./components/about"

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
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App