const Footer = () => {
  return (
    <footer
      className={"flex justify-center bg-gray-300 text-darkJungle dark:bg-darkJungle dark:text-white border-t border-0 p-4 text-center"}
    >
      <div className={"container text-xs"}>
        <p>© {`${new Date().getFullYear()}`} TTS Playground </p>
      </div>
    </footer>
  )
};

export default Footer;
