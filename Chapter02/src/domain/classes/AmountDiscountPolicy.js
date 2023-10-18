import DiscountPolicy from './DiscountPolicy.js';

class AmountDiscountPolicy extends DiscountPolicy {
  #discountAmount = 0;

  constructor(discountAmount, conditions) {
    super(conditions);
    this.#discountAmount = discountAmount;
  }

  getDiscountAmount() {
    return this.#discountAmount.amount;
  }
}

export default AmountDiscountPolicy;
