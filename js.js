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
                
//Returns mathematical function dependend on the input parameter                                  
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
const floatButton = document.querySelector(".btn");
const rmvButton = document.querySelector(".back");
const bod = document.querySelector("body");

//keyboard support
bod.addEventListener("keydown", (event) => {
    console.log(event.key)
    switch(event.key){
        //numbers
        case "0":
            return numberButtons[0].click();
        case "1" :
            return numberButtons[1].click();
        case "2" :
            return numberButtons[2].click();
        case "3" :
            return numberButtons[3].click();
        case "4" :
            return numberButtons[4].click();
        case "5" :
            return numberButtons[5].click();
        case "6" :
            return numberButtons[6].click();
        case "7" :
            return numberButtons[7].click();
        case "8" :
            return numberButtons[8].click();
        case "9" :
            return numberButtons[9].click();

        //operators
        case "+" :
            return ops[0].click();
        case "-" :
            return ops[1].click();
        case "*" :
            return ops[2].click();
        case "/" :
            return ops[3].click();
        case ":" :
            return ops[3].click();

        //other buttons
        case "Enter" :
            return equ.click();
        case "Backspace" :
            return rmvButton.click();
        case "Delete" :
            return clearButton.click();
        case "," :
            return floatButton.click();
    }
})

//onclick/Eventlisteners for euqal,clear,float and back buttons
equ.onclick = () => {
    const result = solve()
    if(result != null) {
      setDisplayResult(result)
    } 
}

clearButton.onclick = function () {
    clearDisplayContent()
}

floatButton.addEventListener("click", () => {
    addFloat()
}
)

rmvButton.addEventListener("click", () => {
    removeElement();
    updateDisplay();
})

//removes Elements after checking if whitespaces need to be removed too
function removeElement() {
    if(globalDisplayContent.slice(-1) == " "){
        globalDisplayContent = globalDisplayContent.substring(0, globalDisplayContent.length -3);
    } else{
        globalDisplayContent = globalDisplayContent.substring(0, globalDisplayContent.length -1);
    }
}

//converts globalsDisplaycontent into string before updating the display to prevent numbers from slipping through and causing trouble later on
function setDisplayResult(result) {
    globalDisplayContent = String(result);
    updateDisplay();        
}

//sets globalDisplayContent to empty and updates the display
function clearDisplayContent() {
    globalDisplayContent = "";
    updateDisplay();        
}

//adds additionalContent to globalDisplayContent and updates the Display
function addNumber(additionalContent) {
    globalDisplayContent += additionalContent;   
    updateDisplay();
}

//adds an operator if requirements are met
function addOperator(operator) {
    if(containsOperator() == true) {
        // we already have an operator so we want to solve the statement first and take the result as first operand
        const result = solve();
        if(result != undefined //solve has to return a value
            && containsTwoOperands() == false) { //there musnt be a second operand
                    setDisplayResult(result);            
                    addOperator(operator);
        } else {
            //no result
        }
    } else if(globalDisplayContent.slice(-1) != "") { //something has to be on the display if an operator is to be added
        globalDisplayContent += " " + operator  + " "
        updateDisplay()
    }
}

//checks if there is a second operand
function containsTwoOperands(){
    if( getContentParts(globalDisplayContent)[2]) {
        return true
    } else {
        return false
    }
}

//checks if there is an operator
function containsOperator() {
    if( getContentParts(globalDisplayContent)[1]) {
        return true
    } else {
        return false
    }
}

//adds a float if requirements are met
function addFloat(){
    if(containsFloat()==false //there musnt be a float already in the current number
        && globalDisplayContent.slice(-1) != " " //the last thing entered musnt be an operator
        && globalDisplayContent.slice(-1) != ""){ //there must be something entered before the float
            globalDisplayContent += ".";
            updateDisplay()
    }
}

//checks if a float is present in current number
function containsFloat(){
    let content = checkLast();
    if(content.includes(".")){
        return true
    } else{
        return false
    }
}

//returns the last thing entered
function checkLast(){
    return getContentParts(globalDisplayContent)[checkStatus()]; 
}

function updateDisplay() {
// update html element
    display.textContent = globalDisplayContent;
}

//checks where user is in the math equation and returns index number in array
function checkStatus(){
    if(getContentParts(globalDisplayContent)[0]== ""){
        return 0;
    } else if(getContentParts(globalDisplayContent)[1]== undefined){
        return 0;
    } else if(getContentParts(globalDisplayContent)[2]== ""){
        return 1;
    } else{
        return 2;
    }
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
            } else if(index === 1){
                addOperator("-");
            } else if(index === 2){
                addOperator("x");
            } else{
                addOperator("/");
            }        
        };
}

//turns displayContent into an array
function getContentParts(displayContent) {
    return displayContent.split(" "); //seperating
}

//seperates the math equation into its parts and returns it to operate function
function solve() {
    const parts = getContentParts(globalDisplayContent)
    if(containsTwoOperands()) {
        const firstOperand = Number(parts[0]);
        const secondOperand = Number(parts[2]);
        const oper = parts[1]
        return operate(oper,firstOperand,secondOperand);
    }
    return null
}