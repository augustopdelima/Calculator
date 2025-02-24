

function calculator() {

    const CALCULATE_KEY = 'Enter';
    const CLEAR_KEY = 'Escape';
    const DECIMAL_KEY = '.';
    const BACKSPACE_KEY = 'Backspace';
    const BACKSPACE_SYMBOL = '⬅';
    const CALCULATE_SYMBOL = '=';
    const CLEAR_SYMBOL = 'C';
    const DIVISION_ERROR_MSG = 'ERROR:Division by zero'

    const valideKeys = ['+', '-', '/', '*', BACKSPACE_KEY, DECIMAL_KEY, CALCULATE_KEY, CLEAR_KEY, BACKSPACE_SYMBOL, CALCULATE_SYMBOL, CLEAR_SYMBOL];


    function isValideKey(key) {
        return valideKeys.includes(key);
    }

    function isOperationKey(key) {
        return !!options[key]
    }

    function isNumber(key) {
        return !isNaN(key);
    }

    const options = {
        "+": add,
        "-": subtract,
        "/": divide,
        "*": multiply
    }

    let _calculator = {
        displayValue: 0,
        numberA: null,
        numberB: null,
        operation: null,
        waitingForOperand: false,
    }


    function handleInput(value) {


        if (isNumber(value)) {
            addDigit(value);
            return;
        }


        if (isOperationKey(value)) {

            handleOperator(value);

            return;
        }

        if (value === CALCULATE_KEY || value === CALCULATE_SYMBOL) {
            calculate();
            return;
        }

        if (value === BACKSPACE_KEY || value === BACKSPACE_SYMBOL) {
            backspace();
            return;
        }

        if (value === DECIMAL_KEY) {
            addDecimal();
            return;
        }

        if (value === CLEAR_KEY || value === CLEAR_SYMBOL) {
            clear();
            return;
        }

    }

    function handleOperator(nextOperator) {
        const { displayValue, operation, waitingForOperand } = _calculator;


        if (operation && !waitingForOperand) {
            const result = performCalculation();


            if(result === DIVISION_ERROR_MSG) {
                _calculator.displayValue = result;
                updateDisplay();
                clear();
                return;
            }


            _calculator.displayValue = result;
            _calculator.numberA = result;
            _calculator.numberB = undefined;
            _calculator.waitingForOperand = true;
            updateDisplay();

            return;
        }

        _calculator.numberA = displayValue;
        _calculator.operation = nextOperator;
        _calculator.waitingForOperand = true;
        updateDisplay();
    }

    function updateDisplay() {
        setDisplay(_calculator.displayValue.toString());
    }

    function clear() {
        _calculator = {
            displayValue:0,
            numberA:null,
            numberB:null,
            operation:null,
            waitingForOperand:false
        };

        updateDisplay();
    }


    function backspace() {
        const displayValue = _calculator.displayValue.toString();
        if (displayValue.length === 0) return;
        const START = 0;
        const LAST_CHARACTER = -1; 
        const DISPLAY_EMPTY_VALUE = 0;

        _calculator.displayValue = displayValue.length === 1 ? DISPLAY_EMPTY_VALUE : displayValue.slice(START, LAST_CHARACTER);
        updateDisplay();
    }

    function setDisplay(string) {
        const display = document.getElementById("operation-display");
        display.textContent = string;
    }

    function addDigit(digit) {
        const {displayValue, waitingForOperand} = _calculator;
        const EMPTY = 0;

        if(!waitingForOperand) {
            _calculator.displayValue = displayValue === EMPTY && digit !== DECIMAL_KEY ? digit : displayValue + digit;
            updateDisplay();
            return;
        }

        _calculator.displayValue = digit;
        _calculator.waitingForOperand = false;
        updateDisplay();

    }

    function addDecimal() {
        const isDecimal = _calculator.displayValue.toString().includes(DECIMAL_KEY);
        if (isDecimal) return;
        _calculator.display += DECIMAL_KEY;
        updateDisplay();
    }

    function add(numberA, numberB) {
        return numberA + numberB;
    }

    function divide(numberA, numberB) {
        const ERROR_DIVIDER = 0;
        
        if(numberB === ERROR_DIVIDER) return DIVISION_ERROR_MSG;
        
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
        const result = operation(Number(numberA), Number(numberB));
        return result;
    }

    function performCalculation() {
        const { operation, numberA, displayValue} = _calculator;
        const numberB = displayValue;

        const result = operate(operation, numberA, numberB);

        return result;

    }

    function calculate() {
        const { operation, waitingForOperand } = _calculator;

        if (!operation || waitingForOperand) {
            return;
        }

        const result = performCalculation();

        if(DIVISION_ERROR_MSG === result) {
            _calculator.displayValue = result;
            updateDisplay();
            clear();
            return;
        }

        _calculator.displayValue = result;
        _calculator.numberA = result;
        _calculator.operation = null;
        _calculator.waitingForOperand = true;
        updateDisplay();
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

        handleInput(keyPressed);
    }

    function handleButtonClick(event) {
        const keyClicked = event.target.textContent;

        const isValideKey = validateKeyPressed(keyClicked);

        if (!isValideKey) return;

        handleInput(keyClicked);
    }

    return {
        handleKeyDown,
        handleButtonClick
    }
}




const calc = calculator();

document.addEventListener("keydown", calc.handleKeyDown);
document.addEventListener("click", calc.handleButtonClick);
