input.onButtonEvent(Button.AB, btf.buttonEventValue(ButtonEvent.Hold), function () {
    receiver.buttonABhold()
})
receiver.onSpurEvent(function (links_hell, rechts_hell, abstand_Stop) {
    receiver.buffer_Spur_folgen(btf.btf_receivedBuffer19(), links_hell, rechts_hell, abstand_Stop)
    receiver.event_Spur_folgen(
    Spur_Sensor_Knopf_B,
    links_hell,
    rechts_hell,
    192,
    160,
    31,
    abstand_Stop,
    cb2.cb2_zehntelsekunden(btf.ePause.s1)
    )
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    Ultraschall_Sensor_Knopf_A = !(Ultraschall_Sensor_Knopf_A)
    btf.set_timeoutDisbled(Ultraschall_Sensor_Knopf_A)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    if (Kreis_Knopf_AB) {
        receiver.fahreStrecke(220, 3, 150)
    } else {
        receiver.fahreStrecke(220, 29, 150)
    }
    receiver.pinServoGeradeaus()
    Kreis_Knopf_AB = !(Kreis_Knopf_AB)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    Spur_Sensor_Knopf_B = !(Spur_Sensor_Knopf_B)
    Ultraschall_Sensor_Knopf_A = Spur_Sensor_Knopf_B
    btf.set_timeoutDisbled(Spur_Sensor_Knopf_B)
})
receiver.onAbstandEvent(function (abstand_Sensor, abstand_Stop, cm) {
    receiver.buffer_Hindernis_ausweichen(btf.btf_receivedBuffer19(), abstand_Stop)
    receiver.event_Hindernis_ausweichen(
    Ultraschall_Sensor_Knopf_A && !(Spur_Sensor_Knopf_B),
    abstand_Stop,
    255,
    16,
    64,
    0,
    randint(5, 20)
    )
    if (abstand_Stop) {
        receiver.setLedColors(receiver.eRGBled.b, 0xff0000)
    } else {
        receiver.setLedColors(receiver.eRGBled.b, 0xffff00, abstand_Sensor)
    }
})
input.onButtonEvent(Button.B, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonBhold()
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
        receiver.setLedColorsOff()
    }
    Ultraschall_Sensor_Knopf_A = false
    Spur_Sensor_Knopf_B = false
    receiver.fahreJoystick(btf.btf_receivedBuffer19())
    receiver.writeQwiicRelay(btf.getSchalter(receivedData, btf.e0Schalter.b1))
    receiver.fahrplanBuffer5Strecken(btf.btf_receivedBuffer19(), btf.e3aktiviert.m1)
    receiver.setLedColors(receiver.eRGBled.a, 0x0000ff, true, btf.isBetriebsart(receivedData, btf.e0Betriebsart.p0Fahren))
    btf.zeige5x5Buffer(receivedData)
    btf.zeige5x5Joystick(receivedData)
    receiver.ringTone(btf.getSchalter(receivedData, btf.e0Schalter.b0))
})
function Konfiguration () {
    btf.comment(btf.btf_text("GitHub: calliope-net/fernsteuerung-mkc-e63"))
    btf.comment(btf.btf_text("Erweiterung: calliope-net/fernsteuerung"))
}
input.onButtonEvent(Button.A, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonAhold()
})
let Kreis_Knopf_AB = false
let Spur_Sensor_Knopf_B = false
let Ultraschall_Sensor_Knopf_A = false
receiver.beimStart(
receiver.eHardware.v3,
95,
true,
65
)
Ultraschall_Sensor_Knopf_A = false
receiver.spursensorRegisterEvents()
basic.forever(function () {
    receiver.raiseBufferEvents(btf.btf_receivedBuffer19(), 5, 25)
    receiver.raiseAbstandEvent(Ultraschall_Sensor_Knopf_A, 30, 35)
    receiver.raiseSpurEvent(Spur_Sensor_Knopf_B)
})
loops.everyInterval(700, function () {
    if (btf.timeout(30000, true)) {
        receiver.pinRelay(false)
    } else if (btf.timeout(1000)) {
        receiver.setLedColors(receiver.eRGBled.a, 0xff0000, true, true, 20)
        receiver.dualMotor128(receiver.eDualMotor.M0_M1, 128)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, false)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.cd, false)
        receiver.ringTone(false)
    } else if (btf.timeout(1000, true)) {
        receiver.setLedColors(receiver.eRGBled.a, 0x00ff00)
    }
})
