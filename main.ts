myController.onSetup(myController.ConfirmationMode.Require, function () {
    myController.applySettings("vc;init; vc;sl;1;-100;100;1;1;0;1;; vc;sr;1;-60;60;1;1;0;0;; vc;jrx;-60;60;1;0;0; vc;jry;-100;100;1;0;0; vc;b;1;0;0;<i class=\"fa-solid fa-volume-high\"></i>; vc;b;2;1;2;<i class=\"fa-regular fa-lightbulb\"></i>; vc;b;3;1;0;<i class=\"fa-regular fa-lightbulb\"></i>; vc;b;4;1;0;<i class=\"fa-solid fa-lightbulb\"></i>; vc;ox;1;-45;45;-60;60;1;0;0; vc;oy;0;-45;45;-7;7;1;0;0; vc;il;1; vc;ir;2; vc;show;sl,sr,jr,br,bl;")
})
myController.onCommandReceived(function () {
    if (myController.rightSliderChanged() || myController.orientationChanged(myController.OrientationAxis.X) || myController.rightJoystickChanged(myController.JoystickDirection.X)) {
        wuKong.setServoAngle(wuKong.ServoTypeList._360, wuKong.ServoList.S0, 180 + myController.commandValue())
    }
    if (myController.leftSliderChanged() || myController.rightJoystickChanged(myController.JoystickDirection.Y)) {
        wuKong.setServoSpeed(wuKong.ServoList.S7, myController.commandValue())
    }
    if (myController.isButtonPressed("3")) {
        if (myController.toggleButton()) {
            wuKong.setLightMode(wuKong.LightMode.BREATH)
            myController.setButton("3", myController.ButtonVisibility.Visible, myController.ButtonColor.Yellow, "")
        } else {
            wuKong.setLightMode(wuKong.LightMode.OFF)
            myController.setButton("3", myController.ButtonVisibility.Visible, myController.ButtonColor.Black, "")
        }
    }
    if (myController.isButtonPressed("4")) {
        if (myController.toggleButton()) {
            strip.setPixelColor(0, 1048575)
            strip.setPixelColor(1, 1048575)
            myController.setButton("4", myController.ButtonVisibility.Visible, myController.ButtonColor.Yellow, "")
        } else {
            strip.setPixelColor(0, 0)
            strip.setPixelColor(1, 0)
            myController.setButton("4", myController.ButtonVisibility.Visible, myController.ButtonColor.Black, "")
        }
        strip.show()
    }
    if (myController.isButtonPressed("2")) {
        if (myController.toggleButton()) {
            pins.analogWritePin(AnalogPin.P12, 1023)
            pins.analogWritePin(AnalogPin.P15, 1023)
        } else {
            pins.analogWritePin(AnalogPin.P12, 0)
            pins.analogWritePin(AnalogPin.P15, 0)
        }
    }
    if (myController.isButtonPressed("1")) {
        music.ringTone(262)
    }
    if (myController.buttonWasReleased("1")) {
        music.stopAllSounds()
    }
})
let strip: neopixel.Strip = null
strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB)
strip.setBrightness(50)
music.setVolume(20)
myController.useBluetooth()
