import {useEffect, useState} from "react";
import {SpeechSynthesisVoice} from "../../../types/main.js";

const TTSPlayground = () => {
  const [text, setText] = useState('');

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const isPlayButtonActive = () => {
    return text.length > 0;
  }

  const changeVoice = (voiceName: string) => {
    const voice = voices.find((voice) => voice.name === voiceName);
    setSelectedVoice(voice);
  }

  const speak = () => {
    if (!isPlayButtonActive()) {
      window.alert("Please enter some text to play")
      return;
    }
    const synth = window.speechSynthesis;
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = selectedVoice;
    synth.speak(utterThis);
  }

  const populateVoiceList = () => {
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    setVoices(voices);
    if (voices.length > 0) {
      setSelectedVoice(voices[0]);
    }
  }

  useEffect(() => {
    populateVoiceList();
  }, []);

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

        <div>
          <select
            className={"border p-2 w-full mt-2 max-w-xs rounded max-h-12"}
            onChange={(e) => {
              const voiceName = e.target.value;
              changeVoice(voiceName);
            }}
            value={selectedVoice?.name}
          >
            {
              voices.map((voice, index) => {
                return (
                  <option
                    key={index}
                    title={voice.name}
                    value={voice.name}
                  >
                    {voice.name}
                  </option>
                )
              })
            }
          </select>
        </div>
      </div>
    </div>
  );
}

export default TTSPlayground;
