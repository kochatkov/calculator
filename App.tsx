const calculator = (string): string => {
  const opMap = {
    '+': (a, b) => {
      return parseFloat(a) + parseFloat(b)
    },
    '-': (a, b) => {
      return parseFloat(a) - parseFloat(b)
    },
    '*': (a, b) => {
      return parseFloat(a) * parseFloat(b)
    },
  };
  const opList = Object.keys(opMap);

  let acc = 0;
  let next = '';
  let currOp = '+';

  for (let char of string) {
    if (opList.includes(char)) {
      acc = opMap[currOp](acc, next);
      currOp = char;
      next = '';
    } else {
      next += char;
    }
  }

  return currOp === '+' ? (acc + parseFloat(next)).toString() : (acc - parseFloat(next)).toString();
}

module.exports = calculator;

console.log(calculator('10 / 2'));

