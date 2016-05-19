"use strict";
/**
 * core
 */
var calculator = new function(){
    var register = "";
    var result = 0; /* Result register, contains also inserted numbers */
    var operator = "";

    this.clear = function(){
        operator = register = "";
        result = 0;
    };

    this.getRegister = function(){
        return register;
    };

    this.getOperator = function(){
        return operator;
    };

    this.getResult = function(){
        return result;
    };

    this.performCalculation = function(){
        if(operator === "" || typeof(register) === Number){
            register = "Invalid calculation";
            return;
        }
        switch(operator){
            case "+":
                result = register + result;
                break;
            case "-":
                result = register - result;
                break;
            case "*":
                result = register * result;
                break;
            case "/":
                result = register / result;
                break;
        }
        operator = register = "";
    };

    this.enterNumber = function(num){
        result = result * 10 + Number(num);
    };

    function setRegister(){
        register = result;
        result = 0;
        // TODO fix that not only operator change shifts register.
    }

    this.enterOperatorAdd = function(){
        setRegister();
        operator = "+";
    };
    this.enterOperatorSubtract = function(){
        setRegister();
        operator = "-";
    };
    this.enterOperatorMultiply = function(){
        setRegister();
        operator = "*";
    };
    this.enterOperatorDivide = function(){
        setRegister();
        operator = "/";
    };
};



/**
 * UI
 */

var ui = new function () {
    var displayInput;
    var displayOutput;

    var self = this;

    this.init = function(idInput, idOutput){
        displayInput = document.getElementById(idInput);
        displayOutput = document.getElementById(idOutput);
        displayOutput.innerHTML = "Welcome";
    };

    this.addOnClickForClass = function(className, func){
        var elements = document.getElementsByClassName(className);

        for(var i = 0; i < elements.length; i++){
            elements[i].addEventListener('click', func, false);
        }
    };

    this.updateDisplay = function(){
        displayOutput.innerHTML = calculator.getRegister() + " " + calculator.getOperator();
        displayInput.innerHTML = calculator.getResult();
    };

    this.handleCommandClick = function(){
        switch (this.getAttribute("id")) {
            case "key-c":
                calculator.clear();
                break;
            case "key-=":
                calculator.performCalculation();
                break;
        }
        self.updateDisplay();
    };

    this.handleOperatorClick = function(){
        switch(this.value){
            case "+":
                calculator.enterOperatorAdd();
                break;
            case "-":
                calculator.enterOperatorSubtract();
                break;
            case "*":
                calculator.enterOperatorMultiply();
                break;
            case "/":
                calculator.enterOperatorDivide();
                break;
        }
        self.updateDisplay();
    };

    this.handleNumberClick = function(){
        calculator.enterNumber(this.value);
        self.updateDisplay();
    };
};

window.addEventListener('load', function() {
    ui.init("input","output");

    ui.addOnClickForClass("number", ui.handleNumberClick);
    ui.addOnClickForClass("operator", ui.handleOperatorClick);
    ui.addOnClickForClass("command", ui.handleCommandClick);
});