
function add(num1,num2) {
    return num1 + num2
};

function subtract(num1,num2) {
   return num1 - num2 
};

function multiply(num1,num2) {
    return num1 * num2
};

function division(num1,num2) {
    return (num1 * 1.0) / (num2 * 1.0)
};

function operator(operator,num1,num2) {
    let obj = {
        addition: add(num1,num2),
        subtraction: subtract(num1,num2),
        multiplication: multiply(num1,num2),
        division: division(num1,num2)

    }
}



