class Reservation {
  #customer = null;
  #screening = null;
  #fee = null;
  #audienceCount = 0;

  constructor(customer, screening, fee, audienceCount) {
    this.#customer = customer;
    this.#screening = screening;
    this.#fee = fee;
    this.#audienceCount = audienceCount;
  }
}

export default Reservation;
