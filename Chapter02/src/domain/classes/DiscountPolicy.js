import Money from './Money.js';

class DiscountPolicy {
  #conditions = [];

  constructor(...conditions) {
    this.#conditions = conditions;
  }

  calculateDiscountAmount(screening) {
    for (const condition of this.#conditions) {
      if (condition.isSatisfiedBy(screening)) {
        this.getDiscountAmount(screening);
        return this.getDiscountAmount(screening);
      }
    }

    return new Money().zero;
  }
}

export default DiscountPolicy;
