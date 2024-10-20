input.onButtonEvent(Button.AB, btf.buttonEventValue(ButtonEvent.Hold), function () {
    receiver.buttonABhold()
})
receiver.onSpurEvent(function (links_hell, rechts_hell, abstand_Stop) {
    receiver.buffer_Spur_folgen(btf.btf_receivedBuffer19(), links_hell, rechts_hell, abstand_Stop)
    receiver.event_Spur_folgen(
    receiver.isFunktion(receiver.eFunktion.spur_folgen),
    links_hell,
    rechts_hell,
    240,
    192,
    31,
    0,
    abstand_Stop,
    cb2.cb2_zehntelsekunden(btf.ePause.s1)
    )
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (receiver.isFunktion(receiver.eFunktion.ng)) {
        if (receiver.is_v3_2Motoren()) {
            Stop = 30
        } else {
            Stop = 40
        }
        receiver.setFunktion(receiver.eFunktion.hindernis_ausweichen)
    } else if (receiver.isFunktion(receiver.eFunktion.hindernis_ausweichen)) {
        receiver.setFunktion(receiver.eFunktion.ng)
    } else if (receiver.isFunktion(receiver.eFunktion.spur_folgen)) {
        Ultraschall_Sensor_Knopf_A = !(Ultraschall_Sensor_Knopf_A)
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    if (receiver.isFunktion(receiver.eFunktion.ng)) {
        receiver.setFunktion(receiver.eFunktion.fahrplan)
        Kreis_Knopf_AB = !(Kreis_Knopf_AB)
        if (receiver.is_v3_2Motoren()) {
            if (Kreis_Knopf_AB) {
                btf.comment(receiver.fahreStrecke(220, 3, 126))
            } else {
                btf.comment(receiver.fahreStrecke(220, 29, 171))
            }
        } else if (receiver.encoderConnected()) {
            if (Kreis_Knopf_AB) {
                btf.comment(receiver.fahreStrecke(224, 3, 160, true))
            } else {
                btf.comment(receiver.fahreStrecke(224, 29, 160, true))
            }
        } else {
            btf.comment(btf.btf_text("MKC ohne Encoder fährt Kreis 153 3|29 153"))
            receiver.fahreStreckePicker(25, 175, 20)
            receiver.fahreStreckePicker(-25, 175, 20)
            receiver.fahreStreckePicker(50, 90, 20)
            receiver.fahreStreckePicker(30, 10, 75)
            receiver.fahreStreckePicker(-50, 90, 20)
        }
        receiver.pinServoGeradeaus()
        receiver.setFunktion(receiver.eFunktion.ng)
    }
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (receiver.isFunktion(receiver.eFunktion.ng)) {
        if (receiver.is_v3_2Motoren()) {
            Stop = 25
            Ultraschall_Sensor_Knopf_A = false
        } else {
            Stop = 30
            Ultraschall_Sensor_Knopf_A = true
        }
        receiver.setFunktion(receiver.eFunktion.spur_folgen)
    } else if (receiver.isFunktion(receiver.eFunktion.spur_folgen)) {
        Ultraschall_Sensor_Knopf_A = false
        receiver.setFunktion(receiver.eFunktion.ng)
    }
})
receiver.onAbstandEvent(function (abstand_Sensor, abstand_Stop, cm) {
    receiver.buffer_Hindernis_ausweichen(btf.btf_receivedBuffer19(), abstand_Stop)
    receiver.event_Hindernis_ausweichen(
    receiver.isFunktion(receiver.eFunktion.hindernis_ausweichen),
    abstand_Stop,
    255,
    16,
    64,
    0,
    randint(5, 15)
    )
    if (abstand_Stop) {
        btf.setLedColors(btf.btf_RgbLed(btf.eRgbLed.b), 0xff0000)
        if (receiver.isFunktion(receiver.eFunktion.hindernis_ausweichen) || receiver.isFunktion(receiver.eFunktion.spur_folgen)) {
            btf.zeigeBIN(cm, btf.ePlot.bcd, 4, 3)
        }
    } else {
        btf.setLedColors(btf.btf_RgbLed(btf.eRgbLed.b), 0xffff00, abstand_Sensor)
    }
})
input.onButtonEvent(Button.B, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonBhold()
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
        receiver.selectRanging(false)
        btf.setLedColorsOff()
    }
    receiver.setFunktion(receiver.eFunktion.ng, receiver.eTimeoutDisable.nicht)
    Ultraschall_Sensor_Knopf_A = false
    receiver.fahreJoystick(btf.btf_receivedBuffer19())
    receiver.writeQwiicRelay(btf.getSchalter(receivedData, btf.e0Schalter.b1))
    receiver.fahrplanBuffer5Strecken(btf.btf_receivedBuffer19(), btf.e3aktiviert.m1)
    if (btf.isBetriebsart(receivedData, btf.e0Betriebsart.p2Fahrplan)) {
        btf.zeige5x5Betriebsart(true, false)
    } else {
        btf.zeige5x5Buffer(receivedData)
        btf.zeige5x5Joystick(receivedData)
    }
    btf.setLedColors(btf.btf_RgbLed(btf.eRgbLed.a), 0x0000ff, true, btf.isBetriebsart(receivedData, btf.e0Betriebsart.p0Fahren))
    receiver.ringTone(btf.getSchalter(receivedData, btf.e0Schalter.b0))
    pins.pinDigitalWrite(pins.pins_eDigitalPins(pins.eDigitalPins.C16), !(btf.getSchalter(receivedData, btf.e0Schalter.b0)))
})
function Konfiguration () {
    btf.comment(btf.btf_text("GitHub: calliope-net/fernsteuerung-mkc-e63"))
    btf.comment(btf.btf_text("Erweiterung: calliope-net/fernsteuerung"))
}
input.onButtonEvent(Button.A, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonAhold()
})
let Kreis_Knopf_AB = false
let Stop = 0
let Ultraschall_Sensor_Knopf_A = false
receiver.beimStart(
receiver.eHardware.v3,
95,
true,
65,
true
)
Ultraschall_Sensor_Knopf_A = false
basic.forever(function () {
    receiver.buffer_raiseAbstandMotorStop(btf.btf_receivedBuffer19(), true)
    receiver.buffer_raiseAbstandEvent(btf.btf_receivedBuffer19())
    receiver.buffer_raiseSpurEvent(btf.btf_receivedBuffer19())
    receiver.raiseAbstandEvent(receiver.isFunktion(receiver.eFunktion.hindernis_ausweichen) || Ultraschall_Sensor_Knopf_A, Stop)
    receiver.raiseSpurEvent(receiver.isFunktion(receiver.eFunktion.spur_folgen))
})
loops.everyInterval(700, function () {
    if (btf.timeout(30000, true)) {
        receiver.pinRelay(false)
    } else if (btf.timeout(1000)) {
        btf.setLedColors(btf.btf_RgbLed(btf.eRgbLed.a), 0xff0000, true, true)
        receiver.dualMotor128(receiver.eDualMotor.M0_M1, 128)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, false)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.cd, false)
        receiver.ringTone(false)
        pins.pinDigitalWrite(pins.pins_eDigitalPins(pins.eDigitalPins.C16), true)
    } else if (btf.timeout(1000, true)) {
        btf.setLedColors(btf.btf_RgbLed(btf.eRgbLed.a), 0x00ff00)
    }
})
