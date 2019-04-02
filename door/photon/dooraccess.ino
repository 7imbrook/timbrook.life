#include "RelayShield.h"

RelayShield gateRelays;
LEDStatus blinkRed(RGB_COLOR_RED, LED_PATTERN_BLINK);
LEDStatus armReady(RGB_COLOR_GREEN, LED_PATTERN_SOLID);

bool door_activate = false;

void setup()
{
    gateRelays.begin();
    Particle.function("triggerDoor", triggerDoor);
}

int triggerDoor(String extra)
{
    // TODO: publish extra (caller sid)
    door_activate = true;
    return 0;
}

void loop()
{
    if (door_activate)
    {
        armReady.setActive(true);
        // TODO: Lights!
        door_activate = false;
        // Slight delay to time voice response
        delay(1500);
        armReady.setActive(false);
        blinkRed.setActive(true);
        // TODO: pre-fix and paylaod from trigger
        Particle.publish("door-trigger", "open", WITH_ACK);
        gateRelays.on(1);
        delay(5000);
        gateRelays.off(1);
        Particle.publish("door-trigger", "lock", WITH_ACK);
        blinkRed.setActive(false);
    }
}