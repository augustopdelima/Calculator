

function calculator() {
    const offset = 1;

    const valideKeys = ['+', '-', '/', '=', 'Backspace', '.'];

    function isValideKey(key) {
        return valideKeys.includes(key);
    }

    function isOperationKey(key) {
        return !!options[key]
    }

    const options = {
        "+": add,
        "-": subtract,
        "/": divide,
        "*": multiply
    }

    let _calculator = {
        display: '',
        numberA: undefined,
        numberB: undefined,
        operation: undefined
    }


    function handleInput(event) {
        const isNumber = !isNaN(event.key); 
        
        
        if(!isOperationKey(event.key) && _calculator.numberA) {
           _
        }

        
        if(!_calculator.numberA && isNumber) {
            const numberA = `${_calculator.display}${event.key}`
            _calculator.numberA = Number();
        }

        if(_calculator.numberA && _calculator.operation && isNumber) {
            _calculator.numberB = Number(_calculator.display);
        }
    }

    function setDisplay(string) {
        const display = document.getElementById("operation-display");
        display.textContent = string;
    }

    function add(numberA, numberB) {
        return numberA + numberB;
    }

    function divide(numberA, numberB) {
        return numberA / numberB;
    }

    function subtract(numberA, numberB) {
        return numberA - numberB;
    }

    function multiply(numberA, numberB) {
        return numberA * numberB;
    }

    function operate(operator, numberA, numberB) {
        const operation = options[operator];
        const result = operation(numberA, numberB);
        return result;
    }

    function validateKeyPressed(key) {
        const isNotANumber = isNaN(Number(key));

        if (isNotANumber) {

            return isValideKey(key);

        }

        return true;
    }


    function handleKeyDown(event) {

        const keyPressed = event.key;

        const isValideKey = validateKeyPressed(keyPressed);

        if (!isValideKey) return;

        handleInput(event);
    }

    return {
        operate,
        handleKeyDown
    }
}




const calc = calculator();

document.addEventListener("keydown", calc.handleKeyDown);
