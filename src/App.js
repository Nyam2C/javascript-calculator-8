import { Console } from "@woowacourse/mission-utils";
import Calculator from "./Calculator.js";

class App {
  async run() {
    Console.print("덧셈할 문자열을 입력해 주세요.");
    const input = await Console.readLineAsync();

    const calculator = new Calculator();
    const result = calculator.calculate(input);

    Console.print(`결과 : ${result}`);
  }
}

export default App;
