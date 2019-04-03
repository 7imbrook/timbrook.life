import logging

from flask import Flask, request, abort
from twilio.twiml.voice_response import VoiceResponse

from particle import Client, ParticleAPI
from util import Nonce, require_signature, verify_twilio

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True

logger = logging.getLogger(__name__)


@app.route("/voice", methods=["POST"])
@verify_twilio("https://door.timbrook.dev/voice")
def voice():
    if not Client().connected:
        # Raise and let twilio use fallback method which forwards the call to me (or Sam)
        return abort(503)

    resp = VoiceResponse()
    nonce = Nonce().generateNonce()
    gather = resp.gather(
        input="speech", action=f"/delivery?n={nonce}", hints="308", timeout=3
    )
    gather.say("Hi, please say the apartment number you're delivering to", voice="man")
    return str(resp)


@app.route("/delivery", methods=["POST"])
@require_signature
def delivery():
    resp = VoiceResponse()
    apartment_number = request.form["SpeechResult"]
    if "308" in apartment_number:
        if ParticleAPI.triggerFunction(Client(), "triggerDoor"):
            resp.say("Thank you, the door is open", voice="woman")
            return str(resp)
    else:
        # Maybe be more cryptic here so people dont try a ton
        resp.say("Goodbye", voice="man")
    return str(resp)


@app.route("/health", methods=["GET"])
def health():
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)
