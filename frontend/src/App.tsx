import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout.tsx";
import { helpers } from "./helpers/index.ts";
import Home from "./components/Home.tsx";

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
      <Home />
    </Layout>
  );
}
