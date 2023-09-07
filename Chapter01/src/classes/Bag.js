class Bag {
  #amount = 0;
  #invitation = null;
  #ticket = null;

  constructor(amount, invitation) {
    this.#amount = amount;
    this.#invitation = invitation;
  }

  hasInvitation() {
    return this.#invitation !== null;
  }

  hasTicket() {
    return this.#ticket !== null;
  }

  setTicket(ticket) {
    this.#ticket = ticket;
  }

  minusAmount(amount) {
    this.#amount -= amount;
  }

  plusAmount(amount) {
    this.#amount += amount;
  }
}

export default Bag;
