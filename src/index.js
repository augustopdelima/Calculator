const options = {
    "+":add,
    "-":subtract,
    "/":divide,
    "*":multiply
}



function add(numberA,numberB){
    return numberA + numberB; 
}

function divide(numberA,numberB) {
    return numberA / numberB;
}

function subtract(numberA,numberB) {
    return numberA - numberB;
}

function multiply(numberA, numberB) {
    return numberA * numberB;
}

function operate(operator, numberA, numberB) {
    const operation = options[operator];
    const result = operation(numberA,numberB);
    console.log(result)
}

operate("+",4,4);
operate("-",4,2);
operate("/",4,3);
operate("*",4,2);
