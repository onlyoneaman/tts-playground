const Footer = () => {
  return (
    <footer
      className={"bg-gray-300 p-4 text-center"}
    >
      <p>© {`${new Date().getFullYear()}`} TTS Playground </p>
    </footer>
  )
};

export default Footer;
