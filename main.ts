myController.onSetup(SetupConfirmation.Require, function () {
    bluetooth.uartWriteLine("vc;init;")
    bluetooth.uartWriteLine("vc;sl;1;-100;100;1;1;0;1;;")
    bluetooth.uartWriteLine("vc;sr;1;-60;60;1;1;0;0;;")
    bluetooth.uartWriteLine("vc;jrx;-60;60;1;0;0;")
    bluetooth.uartWriteLine("vc;jry;-100;100;1;0;0;")
    bluetooth.uartWriteLine("vc;b;1;0;0;<i class=\"fa-solid fa-volume-high\"></i>;")
    bluetooth.uartWriteLine("vc;b;2;1;2;<i class=\"fa-regular fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;b;3;1;0;<i class=\"fa-regular fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;b;4;1;0;<i class=\"fa-solid fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;ox;1;-45;45;-60;60;1;0;0;")
    bluetooth.uartWriteLine("vc;oy;0;-45;45;-7;7;1;0;0;")
    bluetooth.uartWriteLine("vc;il;1;")
    bluetooth.uartWriteLine("vc;ir;2;")
    bluetooth.uartWriteLine("vc;show;sl,sr,jr,br,bl;")
})
myController.onCommand(function () {
    if (myController.isSlider(InputSide.Right) || myController.isOrientation(InputOrientaton.x) || myController.isJoystick(InputSide.Right, JoystickDirection.x)) {
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 180 + myController.getCommandValue())
    }
    if (myController.isSlider(InputSide.Left) || myController.isJoystick(InputSide.Right, JoystickDirection.y)) {
        wuKong.setServoSpeed(wuKong.ServoList.S7, myController.getCommandValue())
    }
    if (myController.isKey("3", KeyState.Pressed)) {
        if (myController.buttonToggled()) {
            wuKong.setLightMode(wuKong.LightMode.BREATH)
            myController.setButton("3", KeyVisibility.Visible, KeyColor.Yellow, "")
        } else {
            wuKong.setLightMode(wuKong.LightMode.OFF)
            myController.setButton("3", KeyVisibility.Visible, KeyColor.Black, "")
        }
    }
    if (myController.isKey("4", KeyState.Pressed)) {
        if (myController.buttonToggled()) {
            strip.setPixelColor(0, 1048575)
            strip.setPixelColor(1, 1048575)
            myController.setButton("4", KeyVisibility.Visible, KeyColor.Yellow, "")
        } else {
            strip.setPixelColor(0, 0)
            strip.setPixelColor(1, 0)
            myController.setButton("4", KeyVisibility.Visible, KeyColor.Black, "")
        }
        strip.show()
    }
    if (myController.isKey("2", KeyState.Pressed)) {
        if (myController.buttonToggled()) {
            pins.analogWritePin(AnalogPin.P12, 1023)
            pins.analogWritePin(AnalogPin.P15, 1023)
        } else {
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P15, 0)
        }
    }
    if (myController.isKey("1", KeyState.Pressed)) {
        music.ringTone(262)
    }
    if (myController.isKey("1", KeyState.Released)) {
        music.stopAllSounds()
    }
})
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.setBrightness(50)
music.setVolume(20)
