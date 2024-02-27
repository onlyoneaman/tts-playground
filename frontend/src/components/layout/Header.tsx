import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const lsDark = localStorage.getItem('darkMode');
    return lsDark ? JSON.parse(lsDark) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <header
      className={"flex justify-center bg-gray-300 text-darkJungle dark:bg-darkJungle dark:text-white border-b p-4"}
    >
      <div className={"container"}>
        <div className={"flex justify-between items-center"}>
          <div>
            <Link to={"/"}>
              TTS Playground
            </Link>
          </div>
          <div>
            <nav>
              <ul className={"flex items-center justify-center space-x-4"}>
                <li>
                  <Link to={"/"}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to={"/about"}>
                    About
                  </Link>
                </li>
                <li>
                  <button
                    className="p-2"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? '🌞' : '🌜'}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
