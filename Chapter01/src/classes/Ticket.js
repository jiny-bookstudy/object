class Ticket {
  #fee = 0;

  constructor(fee) {
    this.#fee = fee;
  }

  get fee() {
    return this.#fee;
  }
}

export default Ticket;
