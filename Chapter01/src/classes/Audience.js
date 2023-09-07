class Audience {
  #bag = null;

  constructor(bag) {
    this.#bag = bag;
  }

  buyTicket(ticket) {
    if (this.#bag.hasInvitation()) {
      this.#bag.setTicket(ticket);
      return;
    }
    this.#bag.minusAmount(ticket.fee);
    this.#bag.setTicket(ticket);
    return ticket.fee;
  }
}

export default Audience;
