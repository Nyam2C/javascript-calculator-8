class Calculator {
  calculate(input) {
    if (input === "") {
      return 0;
    }
    const { delimiter, numbersString } = this.parseInput(input);
    const numbers = this.splitByDelimiter(numbersString, delimiter);

    this.validate(numbers);

    return this.sum(numbers);
  }

  parseInput(input) {
    if (input.startsWith("//")) {
      let delimiterEndIndex = input.indexOf("\n");
      let skip = 1;

      if (delimiterEndIndex === -1) {
        delimiterEndIndex = input.indexOf("\\n");
        skip = 2;
      }

      const delimiter = input.substring(2, delimiterEndIndex);
      const numbersString = input.substring(delimiterEndIndex + skip);
      return { delimiter, numbersString };
    }

    return { delimiter: ",:", numbersString: input };
  }

  splitByDelimiter(numbersString, delimiter) {
    const regex = new RegExp(`[${delimiter}]`);
    return numbersString.split(regex).filter((str) => str !== "");
  }

  validate(numbers) {
    numbers.forEach((numStr) => {
      const trimmed = numStr.trim();
      if (trimmed === "") {
        return;
      }
      const num = Number(trimmed);

      if (isNaN(num)) {
        throw new Error("[ERROR] 숫자가 아닌 값이 포함되어 있습니다.");
      }

      if (num < 0) {
        throw new Error("[ERROR] 음수는 입력할 수 없습니다.");
      }
    });
  }

  sum(numbers) {
    return numbers.reduce((acc, numStr) => {
      const trimmed = numStr.trim();
      return trimmed === "" ? acc : acc + Number(trimmed);
    }, 0);
  }
}

export default Calculator;
