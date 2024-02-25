import azure.cognitiveservices.speech as speechsdk
import os

subscription_key = os.getenv("AZURE_KEY")
region = os.getenv("AZURE_REGION")

def get_voices():
    voices = []
    speech_config = speechsdk.SpeechConfig(subscription=subscription_key, region=region)

    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

    result = speech_synthesizer.get_voices_async().get()

    if result.reason == speechsdk.ResultReason.VoicesListRetrieved:
        v = result.voices[0]
        print(f"Voice: {v.name}, {v.locale}, {v.gender}")
        for voice in result.voices:
            voice_object = {
                'name': voice.name,
                'locale': voice.locale,
                'gender': voice.gender,
                'localName': voice.local_name,
            }
            voices.append(voice_object)
        return voices
    elif result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = result.cancellation_details
        print(f"Speech synthesis canceled: {cancellation_details.reason}")
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            print(f"Error details: {cancellation_details.error_details}")
        return None
    
