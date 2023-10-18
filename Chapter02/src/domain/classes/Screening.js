import Reservation from './Reservation.js';

class Screening {
  #movie = null;
  #sequence = 0;
  #whenScreened = {
    day: '',
    time: null
  };

  constructor(movie, sequence, whenScreened) {
    this.#movie = movie;
    this.#sequence = sequence;
    this.#whenScreened = whenScreened;
  }

  get movieFee() {
    return this.#movie.fee;
  }

  get startTime() {
    return this.#whenScreened;
  }

  isSequence(sequence) {
    return this.#sequence === sequence;
  }

  reserve(customer, audienceCount) {
    return new Reservation(customer, this, this.calculateFee(audienceCount), audienceCount);
  }

  calculateFee(audienceCount) {
    return this.#movie.calculateMovieFee(this) * audienceCount;
  }
}

export default Screening;
