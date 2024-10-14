//simple math arrow functions
let add = (a, b) => a+b;
let sub = (a, b) => a-b;
let divi = (a, b) => a/b ;
let mult = (a, b) => a*b;
let globalDisplayContent = ""

//choosing math function based on operator
let operate = (op,a,b) => {
    const mathFunction = getMathFunction(op)
    return mathFunction(a, b)
}
                /**
                 * Returns mathematical function dependend on the input parameter                 
                 */
function getMathFunction(op)  {
    switch (op) {
        case "+":
            return add            
            case "-":
            return sub            
            case "x":
            return mult            
            case "/":
            return divi            
        default:
            throw new Error("unknown function")
    }
}

//declaration of constants for events
const display = document.querySelector(".window");
const numberButtons = document.getElementsByClassName("numbers");
const ops = document.getElementsByClassName("operator");
const equ = document.getElementById("=");
const clearButton = document.getElementById("clear");

//on click events for "=" and "clear"
equ.onclick = () => {
    const result = solve()
    if(result != null) {
      setDisplayResult(result)
    } 
}

clearButton.onclick = function () {
    clearDisplayContent()
}

function setDisplayResult(result) {
    globalDisplayContent = String(result)
    updateDisplay()        
}

function clearDisplayContent() {
    globalDisplayContent = ""
    updateDisplay()        
}

function addNumber(additionContent) {
    globalDisplayContent += additionContent   
    updateDisplay()
}

function addOperator(operator) {
    if( containsOperator()) {
        // we already have an operator so we want to solve the statement first and take the result as first operand
        const result = solve()
        if(result) {
            setDisplayResult(result)            
            addOperator(operator)
        } else {
            // no result
        }
    } else {        
        globalDisplayContent += " " + operator  + " "
        updateDisplay()
    }
}

function containsOperator() {
    if( getContentParts(globalDisplayContent)[1] ) {
        return true
    } else {
        return false
    }
}

function updateDisplay() {
// update html element
    display.textContent = globalDisplayContent;
}

//for loop to bring the numbers on the screen
for (let i = 0 ; i < numberButtons.length ; i++){
   numberButtons[i].onclick =  () => {    
       addNumber(i)
   };
}    

//for loop to bring the operators on the screen assigning them an index
for( let index = 0 ; index < ops.length ; index++) {
        ops[index].onclick = () => {
            if(index === 0){
                addOperator("+");
            }
            else if(index === 1){
                addOperator("-");
            }
            else if(index === 2){
                addOperator("x");
            }
            else{
                addOperator("/");
            }        
        };
}

function getContentParts(displayContent) {
    return displayContent.split(" "); //seperating
}

function solve(){
    const parts = getContentParts(globalDisplayContent)
    if( parts.length === 3 ) {
        const firstOperand = Number(parts[0]); //turning the seperated numbers from the help function(l. 74) into numbers and asigning them to a variable
        const secondOperand = Number(parts[2]);
        const oper = parts[1]
        return operate(oper,firstOperand,secondOperand); //giving the numbers and the operator to the operate function(l.8) and assigning it a variable
    }
    return null
}