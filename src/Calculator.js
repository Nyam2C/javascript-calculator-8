class Calculator {
  calculate(input) {

    const numbers = this.splitByDelimiter(input);

    return this.sum(numbers);
  }

  splitByDelimiter(numbersString) {
    const regex = new RegExp("[,:]");
    return numbersString.split(regex).filter((str) => str !== "");
  }

  sum(numbers) {
    return numbers.reduce((acc, numStr) => {
      const trimmed = numStr.trim();
      return trimmed === "" ? acc : acc + Number(trimmed);
    }, 0);
  }
}

export default Calculator;