(function () {
    "use strict";
    /**
     * core
     */
    var calculator = function () {
        var register = "";
        var result = 0;
        /* Result register, contains also inserted numbers */
        var operator = "";
        var isResult = false;

        function setRegister() {
            if (Number(register) > 0) {
                return;
            }
            register = result;
            result = 0;
            isResult = false;
        }

        return {
            clear: function () {
                operator = "";
                register = "";
                result = 0;
                isResult = false;
            },

            getRegister: function () {
                return register;
            },

            getOperator: function () {
                return operator;
            },

            getResult: function () {
                return result;
            },

            performCalculation: function () {
                isResult = true;
                if (operator === "" || typeof(register) !== "number") {
                    register = "Invalid calculation";
                    return;
                }
                switch (operator) {
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
                operator = "";
                register = "";
            },

            enterNumber: function (num) {
                if (isResult) {
                    this.clear();
                }
                result = result * 10 + Number(num);
            },


            enterOperatorAdd: function () {
                setRegister();
                operator = "+";
            },
            enterOperatorSubtract: function () {
                setRegister();
                operator = "-";
            },
            enterOperatorMultiply: function () {
                setRegister();
                operator = "*";
            },
            enterOperatorDivide: function () {
                setRegister();
                operator = "/";
            }
        };
    };


    /**
     * UI
     */

    var ui = function () {
        var _calculator = new calculator();
        var displayInput;
        var displayOutput;

        function updateDisplay() {
            displayOutput.innerHTML = _calculator.getRegister() + " " + _calculator.getOperator();
            displayInput.innerHTML = _calculator.getResult();
        }

        return {

            init: function (idInput, idOutput) {
                displayInput = document.getElementById(idInput);
                displayOutput = document.getElementById(idOutput);
                displayOutput.innerHTML = "Welcome";
            },

            addOnClickForClass: function (className, func) {
                var elements = document.getElementsByClassName(className);

                var i;
                for (i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('click', func, false);
                }
            },

            handleCommandClick: function () {
                switch (this.getAttribute("id")) {
                    case "key-c":
                        _calculator.clear();
                        break;
                    case "key-=":
                        _calculator.performCalculation();
                        break;
                }
                updateDisplay();
            },

            handleOperatorClick: function () {
                switch (this.value) {
                    case "+":
                        _calculator.enterOperatorAdd();
                        break;
                    case "-":
                        _calculator.enterOperatorSubtract();
                        break;
                    case "*":
                        _calculator.enterOperatorMultiply();
                        break;
                    case "/":
                        _calculator.enterOperatorDivide();
                        break;
                }
                updateDisplay();
            },

            handleNumberClick: function () {
                _calculator.enterNumber(this.value);
                updateDisplay();
            }
        };
    };

    window.addEventListener('load', function () {
        var _ui = new ui();
        _ui.init("input", "output");

        _ui.addOnClickForClass("number", _ui.handleNumberClick);
        _ui.addOnClickForClass("operator", _ui.handleOperatorClick);
        _ui.addOnClickForClass("command", _ui.handleCommandClick);
    });
}());