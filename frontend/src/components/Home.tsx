import {createBrowserRouter, RouterProvider} from "react-router-dom";

import TTSPlayground from "./Playground/TTSPlayground/TTSPlayground.tsx";
import About from "./Playground/About.tsx";

const Home = () => {

  const router = createBrowserRouter([
    {
      element: <About/>,
      path: "/about"
    },
    {
      element: <TTSPlayground/>,
      path: "*"
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
};

export default Home;
