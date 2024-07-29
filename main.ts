input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    receiver.encoderStartStrecke(20)
    receiver.encoderSelectMotor(192)
})
input.onButtonEvent(Button.B, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonBhold()
})
btf.onReceivedData(function (receivedData) {
    if (btf.isBetriebsart(receivedData, btf.e0Betriebsart.p0Fahren) && btf.getaktiviert(receivedData, btf.e3aktiviert.m0)) {
        receiver.sendM0(btf.btf_receivedBuffer19())
        receiver.writeQwiicRelay(btf.getSchalter(receivedData, btf.e0Schalter.b1))
    } else if (btf.isBetriebsart(receivedData, btf.e0Betriebsart.p2Fahrplan)) {
    	
    }
    receiver.rgbLEDs(receiver.eRGBled.a, 0x0000ff, true)
    btf.zeige5x5Buffer(receivedData)
    btf.zeige5x5Joystick(receivedData)
    receiver.ringTone(btf.getSchalter(receivedData, btf.e0Schalter.b0))
})
input.onButtonEvent(Button.A, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonAhold()
})
receiver.beimStart(
receiver.eHardware.v3,
96,
true,
67
)
loops.everyInterval(700, function () {
    if (btf.timeout(60000, true)) {
        receiver.pinRelay(false)
    } else if (btf.timeout(1000)) {
        receiver.rgbLEDs(receiver.eRGBled.a, 0xff0000, true)
    } else {
        receiver.dualMotor128(receiver.eDualMotor.M0_M1, 128)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, false)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.cd, false)
        receiver.ringTone(false)
    }
})
