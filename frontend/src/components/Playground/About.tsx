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

      <p>
        <span>
          Content generated using TTS Playground can be redistributed and used for commercial purposes, no licenses
          required.
        </span>

        <span>
          All Intellectual Property rights, including copyright, belong to you.
        </span>
      </p>

    </div>
  )
};

export default About;
