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
