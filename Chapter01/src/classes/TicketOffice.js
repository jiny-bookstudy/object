class TicketOffice {
  #amount = 0;
  #tickets = [];

  constructor(amount, ...tickets) {
    this.#amount = amount;
    this.#tickets = tickets;
  }

  get amount() {
    return this.#amount;
  }

  getTicket() {
    return this.#tickets.pop();
  }

  minusAmount(amount) {
    this.#amount -= amount;
  }

  plusAmount(amount) {
    this.#amount += amount;
  }
}

export default TicketOffice;
