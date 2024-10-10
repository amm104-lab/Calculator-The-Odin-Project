//simple math arrow functions
let add = (a, b) => a+b;
let sub = (a, b) => a-b;
let divi = (a, b) => a/b ;
let mult = (a, b) => a*b;
let operations = 0;


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

function seeIfNext(){
    solve();
    if(next==undefined){
        display.textContent = solve();
    }
    else{
        display.textContent = solve() + " " + next + " ";
        operations++
    }
}

//declaration of constants for events
const display = document.querySelector(".window");
const buttons = document.getElementsByClassName("numbers");
const ops = document.getElementsByClassName("operator");
const equ = document.getElementById("=");
const clear = document.getElementById("clear");
const operat = document.querySelector(".operate")

operat.addEventListener("click", () => {
   
    if(operations>=1){
        seeIfNext();
        }
    else{
        operations++;
    }
})

//on click events for "=" and "clear"
equ.onclick = () => {
    seeIfNext();//showing the result of the solve function(l.81) on the display
}
clear.onclick = () => {
    display.textContent = "";//emptying the display
    operations = 0;
}

//for loop to bring the numbers on the screen
for (let i = 0 ; i < buttons.length ; i++){
    (function(index){
        buttons[index].onclick = function(){
        dis = index;
        display.textContent += dis;
        };
    })(i)}

//for loop to bring the operators on the screen assigning them an index
for (let j = 0 ; j < ops.length ; j++){
    (function(index){
        ops[index].onclick = function(){
        dos = index;
            if(index === 0){
                dos = "+";
            }
            else if(index === 1){
                dos="-";
            }
            else if(index === 2){
                dos="x";
            }
            else{
                dos = "/";
            }
        display.textContent += " " + dos + " ";
        };
    })(j)}

 function help(){
    arr = document.getElementsByClassName("window")[0].innerText.split(" "); //seperating
    oper = arr[1]; //assigning a variable the operator
    next = arr[3]    
    arr.splice(0,3, arr[0], arr[2]); //taking out the operator with index[1]
    return arr;}

function solve(){
    let c = Number(help()[0]); //turning the seperated numbers from the help function(l. 74) into numbers and asigning them to a variable
    let d = Number(help()[1]);
    let sol = operate(oper,c,d); //giving the numbers and the operator to the operate function(l.8) and assigning it a variable
    operations = 0;
    return sol;}