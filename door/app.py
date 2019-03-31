from flask import Flask, request
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)


@app.route("/voice", methods=["POST"])
def voice():
    """Respond to incoming phone calls with a 'Hello world' message"""
    # Start our TwiML response
    resp = VoiceResponse()

    # TODO: pass single use token to delivery endpoint to prevent replay
    gather = resp.gather(input="speech", action="/delivery", hints="308", timeout=3)
    gather.say(
        "Hi Amazon, please say the apartment number you're delivering to", voice="man"
    )

    return str(resp)


@app.route("/delivery", methods=["POST"])
def delivery():
    resp = VoiceResponse()
    apartment_number = request.form["SpeechResult"]
    if int(apartment_number) == 308:
        resp.say("Thank you, the door is open", voice="woman")
        # BUZZ THAT DOOR
    else:
        resp.say("Wrong apartment", voice="man")
    return str(resp)


@app.route("/health", methods=["GET"])
def health():
    return "ok"


if __name__ == "__main__":
    app.run(debug=True)
