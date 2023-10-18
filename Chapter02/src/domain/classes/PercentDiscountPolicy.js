import DiscountPolicy from './DiscountPolicy';

class PercentDiscountPolicy extends DiscountPolicy {
  #percent = 0;

  constructor(percent, conditions) {
    super(conditions);
    this.#percent = percent;
  }

  getDiscountAmount(screening) {
    return screening.movieFee.times(this.#percent);
  }
}

export default PercentDiscountPolicy;
