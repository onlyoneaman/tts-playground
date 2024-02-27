import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

const Layout = ({children}) => {

  return (
    <div className={"flex flex-col min-h-screen bg-white dark:bg-darkJungle text-darkJungle dark:text-white"}>
      <Header/>
      <main
        className={"flex justify-center grow p-3"}
      >
        <div className={"container"}>
          {children}
        </div>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
