const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient();

async function ttsHandler(req, res) {
    const text = req.query.text;

    if (!text) {
        res.status(400).send('No text provided');
        return;
    }

    const request = {
        input: {text},
        voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
        audioConfig: {audioEncoding: 'MP3'},
    };

    try {
        const [response] = await client.synthesizeSpeech(request);
        res.writeHead(200, {'Content-Type': 'audio/mp3'});
        res.end(response.audioContent, 'binary');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error synthesizing speech');
    }
}

async function getVoices(req, res) {
  const request = {};

  try {
    const [voices] = await client.listVoices({});

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(voices));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error getting voices');
  }
}

module.exports = {
    ttsHandler,
    getVoices,
}
