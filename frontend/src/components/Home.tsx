import {Route, Routes} from "react-router-dom";

import TTSPlayground from "./Playground/TTSPlayground/TTSPlayground.tsx";
import About from "./Playground/About.tsx";

const Home = () => {

  return (
    <>
      <Routes>
        <Route
          element={<About/>}
          path="/about"
        />
        <Route
          element={<TTSPlayground />}
          path="*"
        />
      </Routes>
    </>
  )
};

export default Home;
