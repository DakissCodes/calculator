
const numberKeys = document.getElementsByClassName('num')
const numberKeysArr = Array.from(numberKeys);
const clear = document.getElementById('ac');
const screen = document.getElementById('result');
const sign = document.getElementById('sign');
const decimalPoint = document.getElementById('decimal');
const operatorKeys = document.getElementsByClassName('operator');
const functionKeys = document.getElementsByClassName('functions')
const equalKey = document.getElementById('equal');
const backspaceKey = document.getElementById('backspace');
const percentageKey = document.getElementById('percentage');
const clickSound = new Audio('sound/click.wav');

let operatorUsed = '';
let number = 0;
let numLimit = false;
let numCombined = 0;
let numArray = [0];
let stagingNumbers = [];
let numNegative = false;

clickSound.playbackRate = 3;

allKeys = [...Array.from(numberKeys), ...Array.from(operatorKeys), ...Array.from(functionKeys)]

allKeys.forEach((item) => {
    // hover & click animation for keys and sound effect
    item.addEventListener('click',()=> {
        playSound()
    })
    item.addEventListener('mousedown', () => {
        item.firstElementChild.style.fontSize = '35px'
        item.firstElementChild.style.transition = '0.1s'
        item.style.backgroundColor = '#1C2833'
    })
    item.addEventListener('mouseup', () => {
        item.firstElementChild.style.fontSize = '25px'
        item.style.backgroundColor = '#283747'
        
})
    item.addEventListener('mouseover', ()=> {
        item.style.backgroundColor = '#1C2833'
    })
    item.addEventListener('mouseout', () => {
        item.style.backgroundColor = '#283747'
    })
})

backspaceKey.addEventListener('click', () => {
    // removes last element from numArray
    numArray.length == 1 ? numArray = [] : numArray.pop()
    combineNumbers()
    // updateScreen()
})

percentageKey.addEventListener("click", () => {
    // divides by 100
    // when number is not pushed into SA, compile numArray
    // When number is pushed into SkA, compile first num of SA

    combineNumbers();
    if (numArray.length == 0) {
        console.log('TEST')
        stagingNumbers[0] = stagingNumbers[0] / 100
        screen.textContent = stagingNumbers[0]
        
    } else {
        numArray = [...(numCombined / 100).toString().substr(0,8).split('')]
        combineNumbers()
    }
    
})

sign.addEventListener('click', () => {


    if (numArray.length == 0) {
        stagingNumbers[0] = (stagingNumbers[0] * -1);
        screen.textContent = stagingNumbers[0];
    } else {
        if ((numArray[0] == 0 || numArray[0] == '-') && numArray.length == 1) {

            if (numNegative) {
                numArray = [0]
                numNegative = false;

            } else if (!numNegative) {
                numArray = ['-']
                numNegative = true;
            }
        } else {
            numArray = (numCombined * -1).toString().split('')

        }
        
    }

    combineNumbers();
})

decimalPoint.addEventListener('click', () => {
    if (!numArray.includes('.')) {
        if (numArray.length === 0) {
            numArray.push('0')
        } 
        numArray.push('.')
        // updateScreen()
    }
    combineNumbers()
})

clear.addEventListener('click', () => {
    // clears the array containing stored numbers
    numArray = [0]
    stagingNumbers = [];
    numNegative = false;
    screen.textContent = 0
})

numberKeysArr.forEach((item) => {
    // adds event listener to each digit.
        //
    item.addEventListener('click', () => {
        zeroLimit = false;

        numArray[0] == 0 && numArray.length == 1 && item.textContent == 0 ? zeroLimit = true: {};
        
        numArray[0] == 0 && numArray.length == 1 && item.textContent != 0 ? numArray = [] : {};


        
        // if (numArray[0] == 0 && numArray.length == 1 && item.textContent == 0) {
        //     zeroLimit = true;

        // }
        
        // if (numArray[0] == 0 && numArray.length == 1 && item.textContent != 0) {
        //     numArray = [];
        // }
        
        
        numArray.length > 7 ? numLimit = true : numLimit = false;

        if (!numLimit && !zeroLimit) {
            numArray.push(item.firstElementChild.textContent)
            // returns the combined inputted numbers
            combineNumbers()

            // shows the screen the combined number
            // updateScreen();
            
        }
    
    })
});

// when clicking op, numArray goes to staging area
// numArray is empty at this point
// inputting another number
// clicking op, numArray goes to staging area
// numArray is empty at this point
// since SA > 1, num is reduced
// staging area = 1, where result is the element
// result becomes the combined num
// numArray becomes the result


equalKey.addEventListener('click', () => {
    pushNum()
    numArray = []

    if (stagingNumbers.length > 1) {
        // if there are 2 nums in SA
        result = stagingNumbers.reduce((total,num) => {
            // do operator
            return doOperator(operatorUsed,Number(total),Number(num)) 
        })
        // push result to the SA 
        stagingNumbers = [];
        stagingNumbers.push(result);
        numCombined = result;
        screen.textContent = result.toString().substr(0,8)
    }
    operatorUsed = null;
})


Array.from(operatorKeys).forEach((operator) => {
    operator.addEventListener('click', () => {
        pushNum()
        numArray = []
        
        if (stagingNumbers.length > 1) {

            result = stagingNumbers.reduce((total,num) => {
                // do operator
                return doOperator(operatorUsed,Number(total),Number(num)) 
            })
            // push result to the SA 
            if (result != null) {
                stagingNumbers = [];
                stagingNumbers.push(result);
                screen.textContent = result.toString().substr(0,8);
                
            } else {
                stagingNumbers.shift()
            }

        }

        operatorUsed = operator.id;

        
    })
})


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

function doOperator(operator,num1,num2) {
    
    let obj = {
        addition: add(num1,num2),
        subtract: subtract(num1,num2),
        multiply : multiply(num1,num2),
        division: division(num1,num2),
        null: null

    }
    return obj[operator]
}

function combineNumbers() {
    console.log(numArray)
    
    if (numArray.length == 1) {
        if (numArray[0] == 0) {
            numCombined = numArray[0]
        } else if (numArray[0] == '-') {
            numCombined = numArray[0]
        } else {
            numCombined = numArray.reduce((total,num) => {
            return total + num
        })

        }
    } else {
        
            numCombined = numArray.reduce((total,num) => {
            return total + num
        })

    }
     

    // numArray.length == 1 && (numArray[0] == 0 || numArray[0] == '-')  ? numCombined = 0 : numCombined = numArray.reduce((total,num) => {
    //     return total + num
    // })
    // FIX BUG
    // when clicking negative sign, turn num to neg
    /// when numArray is empty, start with '-' 


    
    screen.textContent = numCombined;

}

function playSound() {
    clickSound.currentTime = 0
    clickSound.play();
}

function pushNum() {
    if (numArray.length > 1) {
        stagingNumbers.push(numArray.reduce((total, num) => {
            return total + num
        }))

    }
}

function numArrayReducer(arr) {
    return arr.reduce((total, num) => { return total + num })
}

// function updateScreen() {
//     numArray[0] == 0 && numArray.length == 1 ? numArray = [] : {}

//     numArray.length > 0 ? number = numArray.reduce((total, num) => {
//         return total + num
//     }) : number = 0;

//     numArray.length == 1 && numArray[0] == '-' ? number = 0 : null;

//     screen.textContent = number
// };
