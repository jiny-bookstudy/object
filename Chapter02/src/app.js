import { getDayOfWeek } from './utils/date.js';
import Customer from './domain/classes/Customer.js';
import Movie from './domain/classes/Movie.js';
import Money from './domain/classes/Money.js';
import Screening from './domain/classes/Screening.js';
import AmountDiscountPolicy from './domain/classes/AmountDiscountPolicy.js';
import SequenceDiscountCondition from './domain/classes/SequenceDiscountCondition.js';
import PeriodDiscountCondition from './domain/classes/PeriodDiscountCondition.js';

const screeningDay = getDayOfWeek(new Date(2023, 9, 1));
const customer = new Customer('홍길동', 'hong');

const avatar = new Movie(
  '아바타',
  120,
  Money.wons(12000),
  new AmountDiscountPolicy(
    Money.wons(800),
    new SequenceDiscountCondition(1),
    new SequenceDiscountCondition(10),
    new PeriodDiscountCondition(screeningDay, '10:00', '12:00')
  )
);

const screening = new Screening(avatar, 1, {
  day: screeningDay,
  time: '10:00'
});

console.log(avatar.title, avatar.fee.amount, avatar.runningTime);
screening.reserve(customer, 1);
console.log(avatar.title, avatar.fee.amount, avatar.runningTime);
