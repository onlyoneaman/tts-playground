import {useState} from "react";

const TTSPlayground = () => {
  const [text, setText] = useState('');

  const isPlayButtonActive = () => {
    return text.length > 0;
  }

  const speak = () => {
    if(!isPlayButtonActive()) {
      window.alert("Please enter some text to play")
      return;
    }
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }

  return (
    <div>
      <div>
        <h1 className={"text-2xl"}>
          Text to Speech Playground
        </h1>
        <p className={"text-gray-600"}>
          This is a playground for the Text to Speech API.
        </p>
      </div>
      <div>
        <div>
          <textarea
            className={"border p-2 w-full"}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech"
            value={text}
          />
          <span>
            {`Characters: ${text.length}`}
          </span>
        </div>
      </div>

      <div>
        <div>
          <button
            className={"bg-blue-500 text-white p-2 rounded disabled:bg-gray-300 disabled:text-gray-600"}
            disabled={!isPlayButtonActive()}
            onClick={speak}
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export default TTSPlayground;
