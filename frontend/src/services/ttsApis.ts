import { helpers } from "../helpers/index.ts";

const ttsApis = {
    getVoices: async (params: any) => {
        return helpers.api.get({
            url: "/voices",
            params,
        })
    },
    tts: async (params: any) => {
        return helpers.api.get({
            url: "/tts",
            params,
        })
    }
}

export default ttsApis;
