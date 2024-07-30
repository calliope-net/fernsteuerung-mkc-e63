input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    dauerhaft_Knopf_B = !(dauerhaft_Knopf_B)
})
input.onButtonEvent(Button.B, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonBhold()
})
btf.onReceivedData(function (receivedData) {
    if (btf.isBetriebsart(receivedData, btf.e0Betriebsart.p0Fahren)) {
        receiver.sendM0(btf.btf_receivedBuffer19())
        receiver.writeQwiicRelay(btf.getSchalter(receivedData, btf.e0Schalter.b1))
    } else if (btf.isBetriebsart(receivedData, btf.e0Betriebsart.p2Fahrplan)) {
        receiver.fahrplanBuffer5Strecken(btf.btf_receivedBuffer19(), btf.e3aktiviert.m1)
    }
    receiver.setLedColors(receiver.eRGBled.a, 0x0000ff, true, true, 20)
    btf.zeige5x5Buffer(receivedData)
    btf.zeige5x5Joystick(receivedData)
    receiver.ringTone(btf.getSchalter(receivedData, btf.e0Schalter.b0))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 2, 0, 7, btf.getAbstand(receivedData))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 3, 0, 7, receiver.getQwiicUltrasonic(false))
})
input.onButtonEvent(Button.A, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonAhold()
})
let bWiederholung = false
let dauerhaft_Knopf_B = false
receiver.beimStart(
receiver.eHardware.v3,
96,
true,
67
)
lcd20x4.initLCD(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4))
lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 19, lcd20x4.lcd20x4_text("Maker Kit Car"))
basic.forever(function () {
    if (dauerhaft_Knopf_B) {
        receiver.beispielSpurfolger16(
        192,
        160,
        31,
        bWiederholung,
        false,
        20
        )
        bWiederholung = true
    } else if (bWiederholung) {
        dauerhaft_Knopf_B = false
        bWiederholung = false
        receiver.dualMotor128(receiver.eDualMotor.M0, 128)
    }
})
loops.everyInterval(700, function () {
    if (btf.timeout(60000, true)) {
        receiver.pinRelay(false)
    } else if (btf.timeout(1000)) {
        receiver.setLedColors(receiver.eRGBled.a, 0xff0000, true, true, 20)
        receiver.dualMotor128(receiver.eDualMotor.M0_M1, 128)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, false)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.cd, false)
        receiver.ringTone(false)
    } else if (btf.timeout(1000, true)) {
        receiver.setLedColors(receiver.eRGBled.a, 0x00ff00, true, true, 20)
    }
})
