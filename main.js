


// global variable
let valueString = '';
let operatorString = '';
const operandArr = [null, null, null];
let firstOperand = true;
let newNumb = true;

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b){
    let answer = null;
    if(operator === '+'){
        answer = add(a, b);
    }
    else if(operator === '-'){
        answer = subtract(a, b);
    }
    else if(operator === '*'){
        answer = multiply(a, b);
    }
    else if(operator === '/'){
        answer = divide(a, b);
    }
    return answer;
}

function evaluateAnswer(){
    let evalArr = operandArr;
    let answer = null;
    answer = operate(evalArr[1], parseFloat(evalArr[0]), parseFloat(evalArr[2]));
    clearOperandArrFromIndex(0);
    return answer;
}

function clearOperandArrFromIndex(start){
    for(let i = start; i < operandArr.length; i++){
        operandArr[i] = null;
    }
}




const divConatiner = document.querySelector('.calculator-body');
const buttons = divConatiner.querySelectorAll('button');
const displayText = divConatiner.querySelector('.display-text');
const operatorText = divConatiner.querySelector('.operator-text');

displayText.textContent = '0';
operatorText.textContent = '';

document.addEventListener('keydown', e => {
    if(e.code.slice(0,-1) === 'Digit'){
        if(newNumb){
            valueString = '';
            newNumb = false;
        }
        valueString += textToIntConverter(e.key);1
        updateValueString();
    }
})

buttons.forEach(element => {
    element.addEventListener('click', btn => {
        const inputSlice = btn.target.id.slice(4);
        if(inputSlice.length === 1 ){
            if(newNumb){
                valueString = '';
                newNumb = false;
            }
            valueString += textToIntConverter(inputSlice);
            updateValueString();
        }
        else{
            if(inputSlice === 'equals'){
                if(checkIfEqualsCanBePressed()){
                    operandArr[2] = valueString;
                    valueString =  evaluateAnswer().toString();
                    firstOperand = true;
                    updateValueString();
                    operatorString = '';
                    updateOperandString();
                    newNumb = true;
                }
            }
            else if(inputSlice === 'clear'){
                valueString = '';
                operatorString = '';
                clearOperandArrFromIndex(0);
                updateValueString();
                updateOperandString();
                firstOperand = true;
            }
            else if(inputSlice === 'backspace'){
                removeLastChar();
            }
            else if(inputSlice === 'dot'){
                if(!checkForDot()){
                    valueString += '.';
                    updateValueString();
                }
            }
            else {
                textToSymbol(inputSlice);
            }
        }
    });
});

function textToIntConverter(str){
    let uniCodeValue = str.charCodeAt();
    
    if(uniCodeValue >= 48 && uniCodeValue <= 57){
        return str.charCodeAt() - 48;
    }
    return null;
}


function checkIfEqualsCanBePressed(){
    if(operandArr[0] !== null && operandArr[1] !== null && valueString !== ''){
        return true;
    }
    return false;
}

function checkForDot(){
    let tempArr = valueString.split('');
    if(tempArr.includes('.')){
        return true;
    }
    return false;
}


function textToSymbol(str){
    if(operandArr[1] === null && firstOperand){
        operandArr[0] = valueString;
        firstOperand = false;
    }
    else if(operandArr[1] !== null && valueString.length > 0){
        operandArr[2] = valueString;
        operandArr[0] = evaluateAnswer();
        clearOperandArrFromIndex(1);
        valueString = operandArr[0];
        updateValueString();
    }

    if(operandArr[0] !== null){
        if(str === 'add'){
            operandArr[1] = '+';
            operatorString = '(+)';
        }
        else if(str === 'divide'){
            operandArr[1] = '/';
            operatorString = '(/)';
        }
        else if(str === 'sub'){
            operandArr[1] = '-';
            operatorString = '(-)';
        }
        else if(str === 'multiply'){
            operandArr[1] = '*';
            operatorString = '(*)';
        }
        valueString = '';
    }
    updateOperandString();
}

function removeLastChar(){
    if(operatorString.length > 0 && valueString.length === 0){
        valueString = '';
        operatorString = '';
        clearOperandArrFromIndex(0);
        updateValueString();
        updateOperandString();
        firstOperand = true;
    }
    else {
        valueString = valueString.slice(0,-1);
        updateValueString();
    }
}

function updateValueString(){
    if(valueString === 'Infinity' || valueString === '-Infinity'){
        displayText.textContent = 'LOL!';
    }
    else {
        displayText.textContent = valueString;
    }
}

function updateOperandString(){
    operatorText.textContent = operatorString;
}
