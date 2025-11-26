vcController.onVCsetup(function () {
    bluetooth.uartWriteLine("vc;init;")
    bluetooth.uartWriteLine("vc;sl;1;-100;100;1;1;0;1;;")
    bluetooth.uartWriteLine("vc;sr;1;-60;60;1;1;0;0;;")
    bluetooth.uartWriteLine("vc;jrx;-60;60;1;1;0;")
    bluetooth.uartWriteLine("vc;jry;-100;100;1;1;0;")
    bluetooth.uartWriteLine("vc;b;1;1;0;<i class=\"fa-regular fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;b;2;0;0;2;")
    bluetooth.uartWriteLine("vc;b;3;1;0;<i class=\"fa-solid fa-lightbulb\"></i>;")
    bluetooth.uartWriteLine("vc;b;4;0;0;4;")
    bluetooth.uartWriteLine("vc;ox;1;-45;45;-60;60;1;0;0;")
    bluetooth.uartWriteLine("vc;oy;0;-45;45;-7;7;1;0;0;")
    bluetooth.uartWriteLine("vc;il;1;")
    bluetooth.uartWriteLine("vc;ir;2;")
    bluetooth.uartWriteLine("vc;show;sl,sr,jr,br,bl;")
})
bluetooth.onBluetoothDisconnected(function () {
    wuKong.setLightMode(wuKong.LightMode.OFF)
    strip.setPixelColor(0, 0)
    strip.setPixelColor(1, 0)
    strip.show()
})
vcController.onVCcommand(function () {
    if (vcController.isSlider(InputSide.Right) || vcController.isOrientation(InputOrientaton.x) || vcController.isJoystick(InputSide.Right, JoystickDirection.x)) {
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 180 + vcController.getCommandValue())
    }
    if (vcController.isSlider(InputSide.Left) || vcController.isJoystick(InputSide.Right, JoystickDirection.y)) {
        wuKong.setServoSpeed(wuKong.ServoList.S7, vcController.getCommandValue())
    }
    if (vcController.isKey("1", KeyState.Pressed)) {
        if (light2) {
            wuKong.setLightMode(wuKong.LightMode.OFF)
            light2 = 0
        } else {
            wuKong.setLightMode(wuKong.LightMode.BREATH)
            light2 = 1
        }
    }
    if (vcController.isKey("3", KeyState.Pressed)) {
        if (light1) {
            strip.setPixelColor(0, 0)
            strip.setPixelColor(1, 0)
            light1 = 0
        } else {
            strip.setPixelColor(0, 1048575)
            strip.setPixelColor(1, 1048575)
            light1 = 1
        }
        strip.show()
    }
})
let light1 = 0
let light2 = 0
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.setBrightness(50)
