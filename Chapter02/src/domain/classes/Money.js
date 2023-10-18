class Money {
  #ZERO = 0;
  #amount = 0;

  constructor(amount) {
    this.#amount = amount;
  }

  static wons(amount) {
    return new Money(amount);
  }

  get zero() {
    return this.#ZERO;
  }

  get amount() {
    return this.#amount;
  }

  plus(amount) {
    this.#amount += amount;
    return this.#amount;
  }

  minus(amount) {
    this.#amount -= amount;
    console.log(this.#amount);
    return this.#amount;
  }

  times(percent) {
    this.#amount *= percent;
    return this.#amount;
  }

  isLessThan(other) {
    return this.#amount < other;
  }

  isGreaterThanOrEqual(other) {
    return this.#amount >= other;
  }
}
export default Money;
