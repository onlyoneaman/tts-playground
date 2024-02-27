const About = () => {

  return (
    <div
      className={"space-y-3"}
    >
      <p>
        TTS Playground is a Text-to-Speech (TTS) platform that empowers you to create captivating audio content from
        text.
      </p>

      <p>
        <span>
          It currently supports the following TTS providers:
        </span>
        <ul>
          <li>
            - OpenAI
          </li>
          <li>
            - Azure
          </li>
        </ul>
      </p>

      <p>
        TTS Playground is open source and available on GitHub.
      </p>

    </div>
  )
};

export default About;
