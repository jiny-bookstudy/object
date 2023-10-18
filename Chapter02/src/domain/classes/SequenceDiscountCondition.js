class SequenceDiscountCondition {
  #sequence = 0;

  constructor(sequence) {
    this.#sequence = sequence;
  }

  isSatisfiedBy(screening) {
    return screening.isSequence(this.#sequence);
  }
}

export default SequenceDiscountCondition;
