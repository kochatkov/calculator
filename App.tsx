let fontArab = [1, 2, 3, 4, 5, 9, 10];
let fontRom = ["I", "II", "III", "IV", "V", "IX", "X"];

const arabToRoman = (character) => {
  switch(character){
    case '1': return 'I';
    case '2': return 'II';
    case '3': return 'III';
    case '4': return 'IV';
    case '5': return 'V';
    case '6': return 'VI';
    case '7': return 'VII';
    case '8': return 'VIII';
    case '9': return 'IX';
    case '10': return 'X';
    case '19': return 'XIX';
    case '20': return 'XX';
    case '25': return 'XXV';
    case '40': return 'XL';
    case '50': return 'L';
    case '100': return 'C';
    case '500': return 'D';
    case '1000': return 'M';
    default: return '';
  }
}

const toArab = (text) => {
  text = text.trim().toUpperCase();
  let result = 0;
  let posit = 0;
  let n = fontArab.length - 1;
  while (n >= 0 && posit < text.length) {
    if (text.substr(posit, fontRom[n].length) == fontRom[n]) {
      result += fontArab[n];
      posit += fontRom[n].length;
    } else n--;
  }
  return result.toString();
}

const calculator = (string) => {

  if (string.length <= 3 || string.length > 8 || !string.trim()) {
    throw new Error('Error');
  }

  const opMap = {
    '+': (a, b) => {
      return parseFloat(a) + parseFloat(b)
    },
    '-': (a, b) => {
      return parseFloat(a) - parseFloat(b)
    },
    '*': (a, b) => {
      return parseFloat(a) + parseFloat(b)
    },
    '/': (a, b) => {
      return parseFloat(a) + parseFloat(b)
    },
  };
  const opList = Object.keys(opMap);

  let acc = 0;
  let next = '';
  let currOp = '+';
  let result = '';
  const reg = /[IVX]/ig;
  const regError = /[%$#@?]/ig

  if (regError.test(string)) {
    throw new Error('Error');
  }

  for (let char of string) {

    if (opList.includes(char)) {
      if (reg.test(next)) {
        next = toArab(next)
      }
      acc = opMap[currOp](acc, next);

      if (acc > 10) {
        throw new Error('Error');
      }

      currOp = char;
      next = '';

    } else {
      next += char;
    }
  }

  if (reg.test(next)) {
    next = toArab(next)
  }

  if (parseFloat(next) > 10) {
    throw new Error('Error');
  }

  result = currOp === '+' ? (acc + parseFloat(next)).toString()
    : currOp === '*' ? (acc * parseFloat(next)).toString()
      : currOp === '/' ? (Math.floor(acc / parseFloat(next))).toString()
        : (acc - parseFloat(next)).toString();

  return reg.test(string) ? arabToRoman(result) : result;
}

module.exports = calculator;

console.log(calculator('I + V'));


