import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout.js";
import TTSPlayground from "./components/Playground/TTSPlayground/TTSPlayground.tsx";
import { helpers } from "./helpers/index.ts";

export default function App() {
  const [init, setInit] = useState(true);

  useEffect(() => {
    mount();
  }, [])

  const mount = async () => {
    await helpers.api.init();
    setInit(false);
  }

  if(init) {
    return <div>Initializing...</div>
  }

  return (
    <Layout>
      <TTSPlayground />
    </Layout>
  );
}
