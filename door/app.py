from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse
from particle import Client, ParticleAPI, require_signature, Nonce
import logging
from util import verify_twilio


app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)
requests_log = logging.getLogger("requests.packages.urllib3")
requests_log.setLevel(logging.DEBUG)
requests_log.propagate = True

logger = logging.getLogger(__name__)


@app.route("/voice", methods=["POST"])
@verify_twilio("https://door.timbrook.dev/voice")
def voice():
    resp = VoiceResponse()

    # TODO: pass single use token to delivery endpoint to prevent replay
    nonce = Nonce().generateNonce()
    gather = resp.gather(
        input="speech", action=f"/delivery?n={nonce}", hints="308", timeout=3
    )
    gather.say(
        "Hi Amazon, please say the apartment number you're delivering to", voice="man"
    )

    return str(resp)


@app.route("/delivery", methods=["POST"])
@require_signature
def delivery():
    resp = VoiceResponse()
    apartment_number = request.form["SpeechResult"]
    if int(apartment_number) == 308:
        resp.say("Thank you, the door is open", voice="woman")
        # BUZZ THAT DOOR
        ParticleAPI.triggerFunction(Client(), "triggerDoor")
    else:
        resp.say("Wrong apartment", voice="man")
    return str(resp)


@app.route("/health", methods=["GET"])
def health():
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)
