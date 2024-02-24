const express = require('express')
const {ttsHandler, getVoices} = require('./tts')

const app = express()
const port = 5002

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get("/tts", ttsHandler)

app.get("/voices", getVoices);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
