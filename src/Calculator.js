class Calculator {
  calculate(input) {
    const { delimiter, numbersString } = this.parseInput(input);
    const numbers = this.splitByDelimiter(numbersString, delimiter);

    return this.sum(numbers);
  }

  parseInput(input) {
    if (input.startsWith("//")) {
      let delimiterEndIndex = input.indexOf("\\n");

      const delimiter = input.substring(2, delimiterEndIndex);
      const numbersString = input.substring(delimiterEndIndex + 2);
      return { delimiter, numbersString };
    }

    return { delimiter: ",:", numbersString: input };
  }

  splitByDelimiter(numbersString, delimiter) {
    const regex = new RegExp(`[${delimiter}]`);
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
