input.onButtonEvent(Button.AB, btf.buttonEventValue(ButtonEvent.Hold), function () {
    receiver.buttonABhold()
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    if (kreis_Knopf_A) {
        receiver.fahreStrecke(220, 3, 153)
    } else {
        receiver.fahreStrecke(220, 29, 153)
    }
    receiver.pinServo16(16)
    kreis_Knopf_A = !(kreis_Knopf_A)
})
receiver.onSpurEvent(function (links_hell, rechts_hell) {
    receiver.selectMotorStop(true)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 0, 5, links_hell)
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 1, 6, 11, rechts_hell)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    dauerhaft_Knopf_B = !(dauerhaft_Knopf_B)
})
input.onButtonEvent(Button.B, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonBhold()
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
        receiver.setLedColorsOff()
    }
    dauerhaft_Knopf_B = false
    dauerhaft_Spurfolger = cb2.set_dauerhaft_Spurfolger(btf.btf_receivedBuffer19(), btf.e3aktiviert.mc)
    receiver.fahreJoystick(btf.btf_receivedBuffer19())
    receiver.writeQwiicRelay(btf.getSchalter(receivedData, btf.e0Schalter.b1))
    receiver.fahrplanBuffer5Strecken(btf.btf_receivedBuffer19(), btf.e3aktiviert.m1)
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
let dauerhaft_Spurfolger = false
let dauerhaft_Knopf_B = false
let kreis_Knopf_A = false
receiver.beimStart(
receiver.eHardware.v3,
95,
true,
65
)
receiver.spursensorRegisterEvents()
lcd20x4.initLCD(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4))
lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 19, lcd20x4.lcd20x4_text("Maker Kit Car"))
basic.forever(function () {
    receiver.dauerhaft_SpurfolgerBuffer(dauerhaft_Spurfolger, btf.btf_receivedBuffer19())
    if (dauerhaft_Knopf_B && !(btf.timeout(30000, true))) {
        receiver.beispielSpurfolger16(
        192,
        160,
        31,
        bWiederholung,
        true,
        20
        )
        bWiederholung = true
    } else if (bWiederholung) {
        dauerhaft_Knopf_B = false
        bWiederholung = false
        receiver.selectMotorStop(true)
    }
})
loops.everyInterval(700, function () {
    if (btf.timeout(60000, true) && !(dauerhaft_Spurfolger)) {
        receiver.pinRelay(false)
    } else if (btf.timeout(1000)) {
        receiver.setLedColors(receiver.eRGBled.a, 0xff0000, true, true, 20)
        receiver.dualMotor128(receiver.eDualMotor.M0_M1, 128)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.ab, false)
        receiver.qwiicMotorChipPower(receiver.eQwiicMotorChip.cd, false)
        receiver.ringTone(false)
    } else if (btf.timeout(1000, true)) {
        receiver.setLedColors(receiver.eRGBled.a, 0x00ff00, true, false, 20)
    }
})
