input.onButtonEvent(Button.AB, btf.buttonEventValue(ButtonEvent.Hold), function () {
    receiver.buttonABhold()
})
function dauerhaft_Knopf_B_deaktiviert () {
    if (dauerhaft_Knopf_B && !(btf.timeout(30000, true))) {
        receiver.beispielSpurfolger16(
        192,
        160,
        31,
        dauerhaft_Wiederholung,
        true,
        20
        )
        dauerhaft_Wiederholung = true
    } else if (dauerhaft_Wiederholung) {
        dauerhaft_Knopf_B = false
        dauerhaft_Wiederholung = false
        receiver.selectMotorStop(true)
    }
}
receiver.onSpurEvent(function (links_hell, rechts_hell, abstand_Stop) {
    btf.comment(btf.btf_text("Ereignis wird ausgelöst, wenn beim Start registriert"))
    btf.reset_timer()
    btf.comment(btf.btf_text("nur lokal Knopf B Spurfolger ereignisgesteuert ohne Abstandssensor"))
    if (spur_Knopf_B) {
        i += 1
        if (i > imax) {
            imax = i
            btf.zeigeBIN(i, btf.ePlot.bin, 2)
        }
        receiver.eventSpurfolger(
        links_hell,
        rechts_hell,
        false,
        192,
        160,
        31,
        spur_Wiederholung
        )
        spur_Wiederholung = true
        receiver.setLedColors(receiver.eRGBled.b, 0xffffff, links_hell)
        receiver.setLedColors(receiver.eRGBled.c, 0xffffff, rechts_hell)
        i += -1
    } else if (spur_Wiederholung) {
        spur_Knopf_B = false
        spur_Wiederholung = false
        receiver.selectMotorStop(true)
    }
})
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    abstand_Knopf_A = !(abstand_Knopf_A)
    if (abstand_Knopf_A) {
        fahreAbstand(192)
    } else {
        receiver.selectMotorStop(true)
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    if (kreis_Knopf_AB) {
        receiver.fahreStrecke(220, 3, 150)
    } else {
        receiver.fahreStrecke(220, 29, 150)
    }
    receiver.pinServoGeradeaus()
    kreis_Knopf_AB = !(kreis_Knopf_AB)
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    btf.set_timeoutDisbled(true)
    spur_Knopf_B = !(spur_Knopf_B)
    if (spur_Knopf_B) {
        i = 0
        receiver.pinServoGeradeaus()
        receiver.selectMotor(192)
        btf.zeigeBIN(receiver.selectMotorSpeed(), btf.ePlot.map, 3)
        btf.zeigeBIN(receiver.pinServoWinkel(), btf.ePlot.bin, 4)
    } else {
        receiver.selectMotorStop(true)
    }
})
function fahreAbstand (speed: number) {
    receiver.pinServoGeradeaus()
    receiver.selectMotor(speed)
    btf.zeigeBIN(receiver.selectMotorSpeed(), btf.ePlot.map, 3)
    btf.zeigeBIN(receiver.pinServoWinkel(), btf.ePlot.bin, 4)
}
input.onButtonEvent(Button.B, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonBhold()
})
btf.onReceivedDataChanged(function (receivedData, changed) {
    if (changed) {
        receiver.selectMotorStop(true)
        receiver.setLedColorsOff()
    }
    abstand_Knopf_A = false
    spur_Knopf_B = false
    dauerhaft_Knopf_B = false
    dauerhaft_Spurfolger = receiver.set_dauerhaft_Spurfolger(btf.btf_receivedBuffer19(), btf.e3aktiviert.mc)
    receiver.fahreJoystick(btf.btf_receivedBuffer19())
    receiver.writeQwiicRelay(btf.getSchalter(receivedData, btf.e0Schalter.b1))
    receiver.fahrplanBuffer5Strecken(btf.btf_receivedBuffer19(), btf.e3aktiviert.m1)
    receiver.setLedColors(receiver.eRGBled.a, 0x0000ff, true, btf.isBetriebsart(receivedData, btf.e0Betriebsart.p0Fahren))
    btf.zeige5x5Buffer(receivedData)
    btf.zeige5x5Joystick(receivedData)
    receiver.ringTone(btf.getSchalter(receivedData, btf.e0Schalter.b0))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 2, 0, 7, btf.getAbstand(receivedData))
    lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 3, 0, 7, receiver.selectAbstand(false))
})
receiver.onStopEvent(function (abstand_Stop, cm) {
    if (abstand_Knopf_A) {
        btf.reset_timer()
        lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 3, 0, 7, cm)
        if (abstand_Stop) {
            btf.comment(btf.btf_text("immer rückwärts fahren, Richtung und Winkel Zufall"))
            receiver.selectMotor(64)
            if (Math.randomBoolean()) {
                receiver.pinServo16(randint(1, 9))
            } else {
                receiver.pinServo16(randint(23, 31))
            }
        } else {
            btf.comment(btf.btf_text("größer als Start Abstand + 1 Sekunde weiter fahren, dann wieder gerade vorwärts"))
            basic.pause(1000)
            fahreAbstand(255)
        }
    }
})
input.onButtonEvent(Button.A, btf.buttonEventValue(ButtonEvent.Hold), function () {
    btf.buttonAhold()
})
let dauerhaft_Spurfolger = false
let kreis_Knopf_AB = false
let imax = 0
let i = 0
let spur_Wiederholung = false
let spur_Knopf_B = false
let dauerhaft_Wiederholung = false
let dauerhaft_Knopf_B = false
let abstand_Knopf_A = false
receiver.beimStart(
receiver.eHardware.v3,
95,
true,
65
)
abstand_Knopf_A = false
receiver.spursensorRegisterEvents()
lcd20x4.initLCD(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4))
lcd20x4.writeText(lcd20x4.lcd20x4_eADDR(lcd20x4.eADDR.LCD_20x4), 0, 0, 19, lcd20x4.lcd20x4_text("Maker Kit Car"))
basic.forever(function () {
    btf.comment(btf.btf_text("10 Fernstart Spurfolger in Schleife, Spur-Variablen werden in Pin-Ereignissen geändert"))
    receiver.dauerhaft_SpurfolgerBuffer(dauerhaft_Spurfolger, btf.btf_receivedBuffer19())
    if (abstand_Knopf_A) {
        if (!(receiver.selectAbstandSensorConnected())) {
            control.reset()
        }
        receiver.raiseAbstandEvent(true, 30, 35, 25)
    }
    btf.comment(btf.btf_text("dauerhaft_Knopf_B_deaktiviert -> spur_Knopf_B ereignisgesteuert"))
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
        receiver.setLedColors(receiver.eRGBled.a, 0x00ff00, true, false, 20)
    }
})
