const getNumbersEndpoint = "https://100insure.com/mi/api1.php" 
const sendNumbersEndPoint = "https://100insure.com/mi/api2.php"


var list = {   //numbers for regex
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};



let operationArray= ["plus", "minus", "times", "divided by"] //Operations for POST

function getNumbers(){  //Fetch numbers from getNumbersEndpoint
    fetch(getNumbersEndpoint)
    .then(response => response.json())
    .then(json=> renderNumbers(json))
    }

function renderNumbers(numbers){   //Render to DOM
   
    let array = [ numbers["key1"], numbers["key2"]]
    let fixedArray =array.map(fixNum) 
    const num1 =document.getElementById('num1')
       num1.innerHTML = fixedArray[0]
    const num2 =document.getElementById('num2')
       num2.innerHTML = fixedArray[1]
    
    allOps(fixedArray)
}
   
   
   
    
function fixNum(x){  //Test for hyphen in number and split or immediately convert to digits
    if (/[-]/.test(x)){
        let numArr= x.split('-')
        let newNum= list[numArr[0]] + list[numArr[1]]
        return newNum
    }else{
        let newNum=list[x]
        return newNum 
    }
}




function sendNumbers(x,y,z){ //POST request to AP!

return fetch( sendNumbersEndPoint, {
method: "POST",

body: JSON.stringify(
    {"num1": x,
        "num2": y,
    "operation":  z          
})
})
.then(response => response.json())
.then(data =>  renderResults(data,z))   
}

 //All Operations
 function allOps(array){
     let x = array[0]
     let y= array[1]
     for(i=0; i<4; i++){
         
        // post operationArray[i]) in each
        switch(operationArray[i]) {
            case "plus":
                sendNumbers(x,y,"plus") 
              break;
            case "minus":
                sendNumbers(x,y,"minus")
              break;
            case "times":
                sendNumbers(x,y,"times")   
             break;
            case "divided by":
                sendNumbers(x,y,"divided by")
              break;
            default:
                console.log(operationArray)
          }
        }
    }



 function renderResults(result,operation){  //render POST responses on DOM
    let span=  document.getElementById(operation)
    span.innerHTML= result
    }
    


document.addEventListener('DOMContentLoaded', function() {  //send GET request on DOM load
    getNumbers()
  })
 