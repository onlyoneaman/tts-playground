import Header from "./Header.js";
import Footer from "./Footer.js";

const Layout = ({children}) => {

  return (
    <div className={"flex flex-col min-h-screen bg-white text-black"}>
      <Header/>
      <main
        className={"grow p-3"}
      >
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
