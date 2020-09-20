var calculator = function (string) {
    var opMap = {
        '+': function (a, b) {
            return parseFloat(a) + parseFloat(b);
        },
        '-': function (a, b) {
            return parseFloat(a) - parseFloat(b);
        },
        '*': function (a, b) {
            return parseFloat(a) * parseFloat(b);
        }
    };
    var opList = Object.keys(opMap);
    var acc = 0;
    var next = '';
    var currOp = '+';
    for (var _i = 0, string_1 = string; _i < string_1.length; _i++) {
        var char = string_1[_i];
        if (opList.includes(char)) {
            acc = opMap[currOp](acc, next);
            currOp = char;
            next = '';
        }
        else {
            next += char;
        }
    }
    return currOp === '+' ? (acc + parseFloat(next)).toString() : (acc - parseFloat(next)).toString();
};
module.exports = calculator;
console.log(calculator('10 / 2'));
