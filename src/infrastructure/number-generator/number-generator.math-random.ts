import { NumberGenerator } from "../../domain/generic/number-generator";

export class NumberGeneratorMathRandom implements NumberGenerator {
  public generate(): number {
    return Math.random();
  }
}
