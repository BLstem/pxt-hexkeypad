//%color=#DF0174 icon="\uf11c" block="KeyPad"
namespace keypad {
    let padnumber = [["1", "2", "3", "A"], ["4", "5", "6", "B"], ["7", "8", "9", "C"], ["*", "0", "#", "D"]]
    let matrix: number[]

    /** Initialize pins connected to the Hex Keypad. 
     *  Default pins connection is set as follow: 
     *  P1, P2, P6, P9, P10, P12, P15, P16. 
     *  You can change pins connection as you want. 
    */
    //%block="Initialize row 1 %row1|row 2 %row2|row 3 %row3|row 4 %row4|col 1 %col1|col 2 %col2|col 3 %col3|col 4 %col4"
    //%blockId=initialize_key_pad
    //%blockExternalInputs=true
    //%weight=100
    //%row1.fieldEditor="gridpicker" row1.fieldOptions.columns=5 row1.defl=DigitalPin.P1
    //%row2.fieldEditor="gridpicker" row2.fieldOptions.columns=5 row2.defl=DigitalPin.P2
    //%row3.fieldEditor="gridpicker" row3.fieldOptions.columns=5 row3.defl=DigitalPin.P8
    //%row4.fieldEditor="gridpicker" row4.fieldOptions.columns=5 row4.defl=DigitalPin.P12
    //%col1.fieldEditor="gridpicker" col1.fieldOptions.columns=5 col1.defl=DigitalPin.P13
    //%col2.fieldEditor="gridpicker" col2.fieldOptions.columns=5 col2.defl=DigitalPin.P14
    //%col3.fieldEditor="gridpicker" col3.fieldOptions.columns=5 col3.defl=DigitalPin.P15
    //%col4.fieldEditor="gridpicker" col4.fieldOptions.columns=5 col4.defl=DigitalPin.P16
    export function initialize(row1: DigitalPin, row2: DigitalPin, row3: DigitalPin, row4: DigitalPin, col1: DigitalPin, col2: DigitalPin, col3: DigitalPin, col4: DigitalPin): void {
        matrix = [row1, row2, row3, row4, col1, col2, col3, col4]
        for (let i = 4; i < 8; i++) {
            pins.setPull(matrix[i], PinPullMode.PullUp)
        }
        for (let i = 0; i < 4; i++) {
            pins.digitalWritePin(matrix[i], 1)
            pins.digitalWritePin(matrix[i + 4], 1)
        }
    }

    /** Read what you have just pressed and return a string.  
     *  If keypad is not pressed, this function will return an empty string, i.e. "". 
    */
    //%block="reading"
    //%blockId="reading_from_the_pad"
    export function reading(): string {
        let x = -1; let y = -1
        for (let i = 0; i < 4; i++) {
            pins.digitalWritePin(matrix[i], 0)
            for (let j = 4; j < 8; j++) {
                if (pins.digitalReadPin(matrix[j]) == 0) {
                    x = i
                    y = j - 4
                }
            }
            pins.digitalWritePin(matrix[i], 1)
        }
        if (x != -1 && y != -1) {
            return padnumber[x][y]
        }
        else { return "" }
    }
}
