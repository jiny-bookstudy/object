class Theater {
  #ticketSeller = null;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  enter(audience) {
    this.#ticketSeller.sellTo(audience);
  }
}

export default Theater;
