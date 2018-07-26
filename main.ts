//%color=#DF0174 icon="\uf11c" block="KeyPad"
namespace keypad {
    let x = 0
    let y = 0
    let padnumber = [["1", "2", "3", "A"], ["4", "5", "6", "B"], ["7", "8", "9", "C"], ["*", "0", "#", "D"]]
    let matrix: number[]

    /** This block has to be under "forever" loop. 
     *  
    */
    //%block="Initialize row 1 %row1|row 2 %row2|row 3 %row3|row 4 %row4|col 1 %col1|col 2 %col2|col 3 %col3|col 4 %col4"
    //%blockId=initialize_key_pad
    //%blockExternalInputs=true
    //%row1.fieldEditor="gridpicker" row1.fieldOptions.columns=5 row1.defl=DigitalPin.P1
    //%row2.fieldEditor="gridpicker" row2.fieldOptions.columns=5 row2.defl=DigitalPin.P2
    //%row3.fieldEditor="gridpicker" row3.fieldOptions.columns=5 row3.defl=DigitalPin.P6
    //%row4.fieldEditor="gridpicker" row4.fieldOptions.columns=5 row4.defl=DigitalPin.P9
    //%col1.fieldEditor="gridpicker" col1.fieldOptions.columns=5 col1.defl=DigitalPin.P10
    //%col2.fieldEditor="gridpicker" col2.fieldOptions.columns=5 col2.defl=DigitalPin.P12
    //%col3.fieldEditor="gridpicker" col3.fieldOptions.columns=5 col3.defl=DigitalPin.P15
    //%col4.fieldEditor="gridpicker" col4.fieldOptions.columns=5 col4.defl=DigitalPin.P16
    export function initialize(row1: DigitalPin, row2: DigitalPin, row3: DigitalPin, row4: DigitalPin, col1: DigitalPin, col2: DigitalPin, col3: DigitalPin, col4: DigitalPin): void {
        matrix = [row1, row2, row3, row4, col1, col2, col3, col4]
    }

    /** Read what you have just pressed and return a string.  
     *  If the key pad is not pressed, it will return a empty string, i.e. "". 
    */
    //%block="reading"
    //%blockId="reading_from_the_pad"
    export function reading(): string {
        x = 0; y = 0
        for (let i = 0; i < 4; i++) {
            if (pins.digitalReadPin(matrix[i]) == 1) {
                x = i + 1
            }
        }
        for (let i = 4; i < 8; i++) {
            if (pins.digitalReadPin(matrix[i]) == 1) {
                y = i - 3
            }
        }
        if (x != 0 && y != 0) {
            return padnumber[x - 1][y - 1]
        }
        else { return "" }
    }
}
