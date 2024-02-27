import {useEffect, useState} from "react";

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
            <h1>
              TTS Playground
            </h1>
          </div>
          <div>
            <nav>
              <ul className={"flex items-center justify-center space-x-4"}>
                <li>
                  <a href={"/"}>Home</a>
                </li>
                <li>
                  <a href={"/about"}>About</a>
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
