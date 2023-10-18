class Movie {
  #title = '';
  #runningTime = null;
  #fee = null;
  #discountPolicy = null;

  constructor(title, runningTime, fee, discountPolicy) {
    this.#title = title;
    this.#runningTime = runningTime;
    this.#fee = fee;
    this.#discountPolicy = discountPolicy;
  }

  get title() {
    return this.#title;
  }

  get runningTime() {
    return this.#runningTime;
  }

  get fee() {
    return this.#fee;
  }

  calculateMovieFee(screening) {
    // console.log(this.#discountPolicy.calculateDiscountAmount(screening));
    // this.#fee -= this.#discountPolicy.calculateDiscountAmount(screening);
    return this.#fee.minus(this.#discountPolicy.calculateDiscountAmount(screening));
  }
}

export default Movie;
