import { getNumericTime } from '../../utils/date.js';

class PeriodDiscountCondition {
  #dayOfWeek = null;
  #startTime = null;
  #endTime = null;

  constructor(dayOfWeek, startTime, endTime) {
    this.#dayOfWeek = dayOfWeek;
    this.#startTime = startTime;
    this.#endTime = endTime;
  }

  isSatisfiedBy(screening) {
    const { day, time } = screening.startTime;
    const numericScreeningTime = getNumericTime(time);
    const numericStartTime = getNumericTime(this.#startTime);
    const numericEndTime = getNumericTime(this.#endTime);

    return (
      this.#dayOfWeek === day && numericStartTime <= numericScreeningTime && numericEndTime >= numericScreeningTime
    );
  }
}

export default PeriodDiscountCondition;
