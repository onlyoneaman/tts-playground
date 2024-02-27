import {useEffect, useState} from "react";
import {SpeechSynthesisVoice} from "../../../types/main.ts";
import {services} from "../../../services/index.ts";
import AudioContent from "./AudioContent.tsx";

const TTSPlayground = () => {
  const [providers, setProviders] = useState([
    {
      name: "openai", voices: []
    },
    {
      name: "azure", voices: []
    },
  ])

  const [text, setText] = useState('');

  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<null | typeof providers[0]>(null);

  const [audioFileName, setAudioFileName] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const isPlayButtonActive = () => {
    if (loading) {
      return false;
    }
    return text.length > 0;
  }

  const selectProvider = (provider = providers[0]) => {
    setSelectedProvider(provider);
  }

  const changeVoice = (voiceName: string) => {
    if (loading) {
      return;
    }
    const voiceItem = providers.find((voiceItem) => voiceItem.name === selectedProvider?.name);
    const voice = voiceItem?.voices?.find((voice) => voice?.name === voiceName);
    if (!voice) {
      return;
    }
    setSelectedVoice(voice);
  }

  const speak = async () => {
    try {
      if (!isPlayButtonActive()) {
        window.alert("Please enter some text to play")
        return;
      }
      setLoading(true);
      const data = {
        provider: selectedProvider?.name,
        text,
        voice: selectedVoice?.name
      }
      const res = await services.ttsApis.tts(data);

      setAudioFileName(res.data.filename);
    } catch (e) {
      console.error(e);
      window.alert("Failed to play audio")
    }
    setLoading(false);
  }

  const populateVoiceList = async () => {
    const res = await services.ttsApis.getVoices({})
    const voiceItems = res.data.voices;
    setProviders(voiceItems);
    if (voiceItems.length > 0) {
      selectProvider(voiceItems[0]);
      changeVoice(voiceItems[0].voices[0]);
    }
  }

  const mount = async () => {
    await populateVoiceList();
  }

  useEffect(() => {
    mount();
  }, []);

  const voiceOptions = () => {
    const items = selectedProvider?.voices ||
      providers.find((voiceItem) => voiceItem.name === selectedProvider?.name)?.voices || [];
    return (
      items.map((voice, index) => (
        <option
          key={index}
          title={voice?.name}
          value={voice?.name}
        >
          {voice?.name}
        </option>
      ))
    )
  }

  return (
    <div
      className={"space-y-3 md:space-y-5"}
    >
      <div>
        <div>
          <h1 className={"text-2xl"}>
            Text to Speech Playground
          </h1>
          <p className={"text-gray-600 dark:text-gray-400"}>
            This is a playground for the Text to Speech API.
          </p>
        </div>
      </div>

      <div className={"grid grid-cols-2 gap-3"}>
        <div>
          <div>
            <div>
              <textarea
                className={"border text-black bg-gray-300 dark:bg-gray-600 dark:text-white rounded border-none p-2 w-full"}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to convert to speech"
                rows={5}
                value={text}
              />
              <span
                className={"text-gray-600 dark:text-gray-400 text-sm"}
              >
                {`Characters: ${text.length}`}
              </span>
            </div>
          </div>
        </div>

        <div className={"space-y-3"}>
          <div>
            <span className={"text-xs block text-gray-500 dark:text-gray-200 lowercase leading-none"}>
              Provider
            </span>
            <select
              className={"border-none text-black bg-gray-300 dark:bg-gray-600 dark:text-white p-2 w-full max-w-xs rounded max-h-12"}
              onChange={(e) => {
                const provider = providers.find((provider) => provider.name === e.target.value);
                selectProvider(provider);
              }}
              title="Select Provider"
              value={selectedProvider?.name}
            >
              {
                providers.map((provider, index) => {
                  return (
                    <option
                      key={index}
                      title={provider.name}
                      value={provider.name}
                    >
                      {provider.name}
                    </option>
                  )
                })
              }
            </select>
          </div>

          <div>
            <span className={"text-xs block text-gray-500 dark:text-gray-200 lowercase leading-none"}>
              Voice
            </span>
            <select
              className={"border-none text-black bg-gray-300 dark:bg-gray-600 dark:text-white p-2 w-full max-w-xs rounded max-h-12"}
              onChange={(e) => {
                const voiceName = e.target.value;
                changeVoice(voiceName);
              }}
              title="Select a voice"
              value={selectedVoice?.name}
            >
              {voiceOptions()}
            </select>
          </div>

          <div>
            <button
              className={"bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:text-gray-600"}
              disabled={!isPlayButtonActive()}
              onClick={speak}
            >
              {loading ? "Loading..." : "Play"}
            </button>
          </div>
        </div>
      </div>

      <div>
        <AudioContent fileName={audioFileName}/>
      </div>
    </div>
  );
}

export default TTSPlayground;
