class Calculator {
  calculate(input) {
    if (this.isEmptyInput(input)) {
      return 0;
    }

    const { delimiter, numbersString } = this.parseInput(input);
    const numbers = this.splitByDelimiter(numbersString, delimiter);

    this.validate(numbers);

    return this.sum(numbers);
  }

  isEmptyInput(input) {
    return input === "" || input == null;
  }

  parseInput(input) {
    if (input.startsWith("//")) {
      return this.parseCustomDelimiter(input);
    }

    return {
      delimiter: [",", ":"].join(""),
      numbersString: input,
    };
  }

  parseCustomDelimiter(input) {
    let delimiterEndIndex = input.indexOf("\n");
    let skipLength = 1;

    if (delimiterEndIndex === -1) {
      delimiterEndIndex = input.indexOf("\\n");
      skipLength = 2;
    }

    if (delimiterEndIndex === -1) {
      throw new Error(
        "[ERROR] 잘못된 커스텀 구분자 형식입니다. 줄바꿈(\\n)이 필요합니다."
      );
    }

    const delimiter = input.substring(2, delimiterEndIndex);
    const numbersString = input.substring(delimiterEndIndex + skipLength);

    if (delimiter === "") {
      throw new Error("[ERROR] 커스텀 구분자가 비어 있습니다.");
    }

    return { delimiter, numbersString };
  }

  splitByDelimiter(numbersString, delimiter) {
    const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`[${escapedDelimiter}]`);
    const tokens = numbersString.split(regex);

    if (tokens.some((token) => token.trim() === "")) {
      throw new Error("[ERROR] 빈 값이 포함되어 있습니다.");
    }

    return tokens;
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
    return numbers.reduce((sum, numStr) => {
      const trimmed = numStr.trim();
      return sum + Number(trimmed);
    }, 0);
  }
}

export default Calculator;
