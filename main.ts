vcController.onVCsetup(function () {
    bluetooth.uartWriteLine("vc;init;")
    bluetooth.uartWriteLine("vc;sl;1;-100;100;1;1;0;1;;")
    bluetooth.uartWriteLine("vc;sr;1;-60;60;1;1;0;0;;")
    bluetooth.uartWriteLine("vc;jrx;-60;60;1;0;0;")
    bluetooth.uartWriteLine("vc;jry;-100;100;1;0;0;")
    bluetooth.uartWriteLine("vc;b;1;1;0;<i class=\"fa-solid fa-volume-high\"></i>;")
    bluetooth.uartWriteLine("vc;b;2;1;2;<i class=\"fa-regular fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;b;3;1;0;<i class=\"fa-regular fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;b;4;1;0;<i class=\"fa-solid fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;ox;1;-45;45;-60;60;1;0;0;")
    bluetooth.uartWriteLine("vc;oy;0;-45;45;-7;7;1;0;0;")
    bluetooth.uartWriteLine("vc;il;1;")
    bluetooth.uartWriteLine("vc;ir;2;")
    bluetooth.uartWriteLine("vc;show;sl,sr,jr,br,bl;")
})
vcController.onVCcommand(function () {
    if (vcController.isSlider(InputSide.Right) || vcController.isOrientation(InputOrientaton.x) || vcController.isJoystick(InputSide.Right, JoystickDirection.x)) {
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 180 + vcController.getCommandValue())
    }
    if (vcController.isSlider(InputSide.Left) || vcController.isJoystick(InputSide.Right, JoystickDirection.y)) {
        wuKong.setServoSpeed(wuKong.ServoList.S7, vcController.getCommandValue())
    }
    if (vcController.isKey("3", KeyState.Pressed)) {
        if (vcController.buttonToggled()) {
            wuKong.setLightMode(wuKong.LightMode.OFF)
        } else {
            wuKong.setLightMode(wuKong.LightMode.BREATH)
        }
    }
    if (vcController.isKey("4", KeyState.Pressed)) {
        if (vcController.buttonToggled()) {
            strip.setPixelColor(0, 0)
            strip.setPixelColor(1, 0)
        } else {
            strip.setPixelColor(0, 1048575)
            strip.setPixelColor(1, 1048575)
        }
        strip.show()
    }
    if (vcController.isKey("2", KeyState.Pressed)) {
        if (vcController.buttonToggled()) {
            pins.analogWritePin(AnalogPin.P12, 1023)
            pins.analogWritePin(AnalogPin.P15, 1023)
        } else {
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P15, 0)
        }
    }
    if (vcController.isKey("1", KeyState.Pressed)) {
        music.ringTone(262)
    }
    if (vcController.isKey("1", KeyState.Released)) {
        music.stopAllSounds()
    }
})
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.setBrightness(50)
music.setVolume(20)
