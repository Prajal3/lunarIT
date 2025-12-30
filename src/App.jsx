import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Front  from "./pages/front"
import Home from "./pages/home"

function App() {
  const router = createBrowserRouter([

    {
      path:"/",
      element:<Front/>
    },
    {
      path:"/home",
      element:<Home/>
    }





  ]);

  return (<RouterProvider router={router} />)
  
};

export default App
