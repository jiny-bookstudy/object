class TicketSeller {
  #ticketOffice = null;
  constructor(ticketOffice) {
    this.ticketOffice = ticketOffice;
  }

  get ticketOffice() {
    return this.#ticketOffice;
  }

  sellTo(audience) {
    this.#ticketOffice.plusAmount(audience.buyTicket(this.#ticketOffice.getTicket()));
  }
}

export default TicketSeller;
