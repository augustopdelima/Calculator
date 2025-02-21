

function calculator() {

    const CALCULATE_KEY = 'Enter';
    const CLEAR_KEY = 'Escape';
    const DECIMAL_KEY = '.';
    const BACKSPACE_KEY = 'Backspace';
    const BACKSPACE_SYMBOL = '⬅';
    const CALCULATE_SYMBOL = '=';
    const CLEAR_SYMBOL = 'C';

    const valideKeys = ['+', '-', '/','*', BACKSPACE_KEY, DECIMAL_KEY, CALCULATE_KEY, CLEAR_KEY, BACKSPACE_SYMBOL, CALCULATE_SYMBOL, CLEAR_SYMBOL];


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
        display: '',
        numberA: undefined,
        numberB: undefined,
        operation: undefined,
        shouldClearDisplay: false,
    }


    function handleInput(value) {


        if (isNumber(value)) {
            updateDisplay(value);
            console.log('r',_calculator)
            return;
        }


        if (isOperationKey(value)) {
            console.log('s',_calculator);
            setOperation(value);
            
            return;
        }

        if (value === CALCULATE_KEY || value === CALCULATE_SYMBOL) {
            calculate();
            console.log('c',_calculator);
            return;
        }

        if (value === BACKSPACE_KEY || value === BACKSPACE_SYMBOL) {
            backspace();
            console.log('b',_calculator);
            return;
        }

        if(value === DECIMAL_KEY) {
            addDecimal();
            console.log('d',_calculator);
            return;
        }

        if(value === CLEAR_KEY || value === CLEAR_SYMBOL) {
            clear();
            console.log('cl',_calculator);
            return;
        }

    }

    function setOperation(value) {
        
        if(_calculator.operation && !_calculator.shouldClearDisplay) {
            calculate();
        }

        _calculator.numberA = _calculator.display;
        _calculator.operation = value;
        _calculator.shouldClearDisplay = true;
    }

    function updateDisplay(value) {
        if (_calculator.shouldClearDisplay) {
            clearDisplay();
        }
        _calculator.display += value;
        setDisplay(_calculator.display);
    }

    function clear() {
        _calculator.numberA = undefined;
        _calculator.numberB = undefined;
        _calculator.operation = undefined;
        clearDisplay();
    }

    function clearDisplay() {
        _calculator.display = '';
        _calculator.shouldClearDisplay = false;
        setDisplay('');
    }

    function backspace() {
        if(_calculator.display.length === 0) return;
        
        const START = 0;
        const LAST_CHARACTER = -1;

        _calculator.display = _calculator.display.slice(START,LAST_CHARACTER);
        setDisplay(_calculator.display);
    }

    function setDisplay(string) {
        const display = document.getElementById("operation-display");

        if (_calculator.shouldClearDisplay) {
            clearDisplay();
        }

        display.textContent = string;
    }

    function addDecimal() {
        const isDecimal = _calculator.display.includes(DECIMAL_KEY);
        if(isDecimal) return;
        _calculator.display += DECIMAL_KEY;
        setDisplay(_calculator.display); 
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
        const result = operation(Number(numberA), Number(numberB));
        return result;
    }

    function calculate() {
        if (_calculator.operation === undefined || _calculator.shouldClearDisplay) return;

        _calculator.numberB = _calculator.display;

        const result = operate(_calculator.operation, _calculator.numberA, _calculator.numberB);

        setDisplay(result);
        _calculator.numberA = result;
        _calculator.numberB = undefined;
        _calculator.operation = undefined;
        _calculator.shouldClearDisplay = true;

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

        if(!isValideKey) return;

        handleInput(keyClicked);
    }

    return {
        handleKeyDown,
        handleButtonClick
    }
}




const calc = calculator();

document.addEventListener("keydown", calc.handleKeyDown);
document.addEventListener("click",calc.handleButtonClick);
