document.addEventListener('DOMContentLoaded', function() {
    var numbers = document.getElementsByClassName("MyInput");
    var operators = document.getElementsByClassName("operator");
    var displayElement = document.getElementById("display");
    var clearElement=document.getElementById("clear");
    var result=''; //storing result as string
    result_display=false; //lag to check the result is displayed or not?
    var values = []; //for storing values and operators
//function to display numbers
    function display(value) {
        displayElement.value = value;
    }
//function to check numbers 
    function checknum(value) {
        var numvalues = Array.from(numbers).map(function(button) {
            return button.value;
        });
        return numvalues.includes(value);
    }
 //function to check operator like +,-,*,/
    function checkoperator(value) {
        var operatorValues = Array.from(operators).map(function(button) {
            return button.value;
        });
        return operatorValues.includes(value);
    }
    //function to check precedence of operator
    function precedence(op) {
        if (op === '+' || op === '-') return 1;
        if (op === '*' || op === '/') return 2;
        return 0;
    }
  //converting infix to postfix expresion like 5*2+2 as 53*2+
    function infixToPostfix(values) {
        var output = [];
        var stack = [];
        var number = '';

        for (var i = 0; i < values.length; i++) {
            if (checknum(values[i])) {
                number += values[i];
            } else if (checkoperator(values[i])) {
                if (number) {
                    output.push(number);
                    number = '';
                }
                while (stack.length && precedence(stack[stack.length - 1]) >= precedence(values[i])) {
                    output.push(stack.pop());
                }
                stack.push(values[i]);
            }
        }
        if (number) {
            output.push(number);
        }
        while (stack.length) {
            output.push(stack.pop());
        }
        return output;
    }
  //here calculating the values 
    function evaluatePostfix(postfix) {
        var stack = [];
        for (var i = 0; i < postfix.length; i++) {
            if (!isNaN(postfix[i])) {
                stack.push(Number(postfix[i]));
            } else {
                var b = stack.pop();
                var a = stack.pop();
                switch (postfix[i]) {
                    case '+': stack.push(a + b); break;
                    case '-': stack.push(a - b); break;
                    case '*': stack.push(a * b); break;
                    case '/': stack.push(a / b); break;
                }
            }
        }
        return stack[0];
    }
   //main calculate function
    function calculate(values) {
        values.pop(); // Remove '='
        var postfix = infixToPostfix(values);
        result = evaluatePostfix(postfix).toString();
        display(result);
        result_display=true;
        
    }
   //handle function to capture value form buttons as event capturing
    function handleButtonClick(event) {
        var value = event.target.value;
        //restoring the results by making values empty for further process
        if (result_display && checkoperator(value)) {
            values = [];  
            values = [...result.split('')]; 
            result_display = false;
        }

        values.push(value);
        display(values.join(''));
        if (value === '=') {
            calculate(values);
        }

    }
    //function to clear display
    function clearDisplay(){
        values.length=0;
        display('');
    }

    // For handling numbers
    Array.from(numbers).forEach(function(button) {
        button.addEventListener('click', handleButtonClick);
    });

    // For handling operators
    Array.from(operators).forEach(function(button) {
        button.addEventListener('click', handleButtonClick);
    });
    //for handing clear buttons
    clearElement.addEventListener('click',clearDisplay);

});
