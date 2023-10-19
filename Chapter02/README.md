## 🎞️ 영화 예매 시스템으로 살펴보는 객체지향 프로그래밍

### 요구사항

1. 특정한 할인 조건을 만족하는 예매자는 요금을 할인받을 수 있다.
2. 할인 조건은 두 가지 종류가 있다.
   - **순번 조건(sequence condition):** 상영 순번을 이용해 할인 여부를 결정한다.
   - **기간 조건(period condition):** 영화 상영 시작을 이용해 할인 여부를 결정한다.
3. 할인 정책도 두 가지 종류가 있다.
   - **금액 할인 정책(amount discount):** 예매 요금에서 일정 금액을 차감한다.
   - **비율 할인 정책(percent discount):** 예매 요금의 일정 비율을 차감한다.
4. 할인 조건은 순번 조건과 기간 조건을 혼합할 수 있다.
5. 할인 정책은 아예 적용하지 않을 수 있다.

## 객체지향은 무엇인가?

객체지향은 말 그대로 **객체를 지향하는 것** → 클래스를 먼저 떠올리고 필요한 메서드, 속성를 떠올리는 것이 아닌 ‘객체’에 초점을 맞춰서 설계를 하는 것.

그렇다면 **객체**란 무엇인가? → 역할, 책임, 협력

객체는 고립된 존재가 아니라 협력하는 존재, **즉, 기능을 구현하기 위해 협력하는 공동체의 일원**

### 도메인의 구조를 따르는 프로그램 구조

**도메인**

문제를 해결하기 위해 사용자가 프로그램을 사용하는 분야

- **영화 예매 시스템:** 영화를 좀 더 쉽고 빠르게 예매하려는 사용자의 문제를 해결하는 것 (영화)

도메인에 해당하는 개념들을 구현하기 위해 주로 클래스를 사용한다. 각 클래스의 이름은 도메인의 개념과 동일하거나 유사하게 지어야한다. → **프로그램의 구조를 이해하기 쉽게 하기 위함**

## 자율적인 객체

대개 클래스의 인스턴스 변수는 `private`로 설정하고, 메서드는 `public`으로 설정한다. 이러한 이유는 무엇일까?

- 클래스는 내부와 외부로 구분되며 외부에 공개하거나 감추는 것을 확실하게 구분해야한다.
  - 외부의 간섭을 최소화
  - 외부에서는 객체가 어떤 상태에 놓여있는지, 어떤 생각을 하고 있는지 알아서는 안된다.
- 경계의 명확성이 객체의 자율성을 보장한다.
- 한층 더 나아가 객체지향 프로그래밍 언어에서 접근 제어자(public, protected, private)를 제공하는 이유는 객체를 자율적인 존재를 만들기 위함

```jsx
class Movie {
  #title = '';
  #runningTime = null;
  #fee = null;
  #discountPolicy = null;

  constructor(title, runningTime, fee, discountPolicy) {
    this.#title = title;
    this.#runningTime = runningTime;
    this.#fee = fee;
    this.discountPolicy = discountPolicy;
  }

  get title() {
    return this.#title;
  }

  get runningTime() {
    return this.#runningTime;
  }

  get fee() {
    return this.#fee;
  }

  calculateMovieFee(screening) {
    return this.#fee.minus(this.#discountPolicy.calculateDiscountAmount(screening));
  }
}

export default Movie;
```

## 협력하는 객체

영화에 대한 정보를 나타내는 `Movie` 클래스는 여러 객체들의 인스턴스들의 조합으로 구성되었다. 객체가 다른 객체들과 협력하는 수단은 **인터페이스에 공개된 행동을 요청한 후, 응답하는 방식**이다.

```jsx
import { getDayOfWeek } from './utils/date.js';
import Movie from './domain/classes/Movie.js';
import Money from './domain/classes/Money.js';
import AmountDiscountPolicy from './domain/classes/AmountDiscountPolicy.js';
import SequenceDiscountCondition from './domain/classes/SequenceDiscountCondition.js';
import PeriodDiscountCondition from './domain/classes/PeriodDiscountCondition.js';

const screeningDay = getDayOfWeek(new Date());

const avatar = new Movie(
  '아바타',
  120,
  Money.wons(12000),
  new AmountDiscountPolicy(
    Money.wons(800), //할인 금액
    new SequenceDiscountCondition(1), //순번 시작
    new SequenceDiscountCondition(10), //순번 끝
    new PeriodDiscountCondition(screeningDay, '10:00', '12:00') //상영요일
  )
);
```

```jsx
class Movie {
  #title = '';
  #runningTime = null;
  #fee = null;
  #discountPolicy = null;

  constructor(title, runningTime, fee, discountPolicy) {
    this.#title = title;
    this.#runningTime = runningTime;
    this.#fee = fee;
    this.discountPolicy = discountPolicy;
  }

  get title() {
    return this.#title;
  }

  get runningTime() {
    return this.#runningTime;
  }

  get fee() {
    return this.#fee;
  }

  calculateMovieFee(screening) {
    return this.#fee.minus(this.#discountPolicy.calculateDiscountAmount(screening));
  }
}

export default Movie;
```

## 상속과 다형성

### 의존성

`Movie` 인스턴스는 `AmountDiscountPolicy` 클래스 인스턴스에 의존한다. 실제 내부에서는 상속에 의해 `DiscountPolicy` 클래스에 의존하고 있다. 이 부분을 코드의 의존성과 실행 부분에서의 의존성 차이라고 말한다.

```jsx
const avatar = new Movie(
	...
  new AmountDiscountPolicy(
    Money.wons(800),
    new SequenceDiscountCondition(1),
    new SequenceDiscountCondition(10),
    new PeriodDiscountCondition(screeningDay, '10:00', '12:00')
  )
);

//Movie.js
class Movie {
  #title = '';
  #runningTime = null;
  #fee = null;
  #discountPolicy = null;

  constructor(title, runningTime, fee, discountPolicy) {
    this.#title = title;
    this.#runningTime = runningTime;
    this.#fee = fee;
    this.discountPolicy = discountPolicy;
  }
	...
}
```

**의존성의 양면**

설계가 유연해질수록 코드를 이해하고 디버깅하기는 점점 더 어려워지지만, 재사용성과 확장 가능성은 높아진다.

### 상속

상속은 부모 클래스의 인스턴스 멤버들을 재사용하는 것이 목적이 아니라, 부모 클래스의 인터페이스를 포함시키는 것에 가치가있다.

**Movie → 어떤 할인 정책인 것이 궁금한 것이 아니라, ‘할인’이라는 행위를 수행시키는 것이 중요**

### 다형성

다형성의 사전적 의미는 ‘많은 형태’를 뜻한다. → 프로그래밍 관점에서는 한 객체나 함수가 여러 가지 방법으로 동작할 수 있는 능력을 의미 → 객체의 타입에 따라 다르게 동작할 수 있다.

**웹 컴포넌트에서의 다형성**
도메인 부분 뿐만아니라 UI 요소에서도 활용이 가능하다. 다형성을 적용하면 여러 컴포넌트를 통일된 방식으로 관리할 수 있다. **(중복성을 줄이고 유연성을 높인다.)**

```jsx
class Button {
  onClick() {
    // 기본 클릭 동작
  }
}

class PrimaryButton extends Button {
  onClick() {
    console.log('Primary Button Clicked');
  }
}

class SecondaryButton extends Button {
  onClick() {
    console.log('Secondary Button Clicked');
  }
}

function handleButtonClick(button) {
  button.onClick(); // 다형성을 활용한 클릭 이벤트 처리
}
```

## 추상화

추상화를 사용하면 세부적인 내용을 무시한 채 상위 정책을 쉽고 간단하게 표현할 수 있다.

- 영화의 예매 요금은 ‘금액 할인 정책’과 ‘순서 조건, 기간 조건’을 이용해서 계산한다.
  - 영화 예매 요금은 하나의 ‘할인 정책’과 ‘할인 조건’을 이용해 계산한다.
- 상위 정책을 쉽고 간단하게 만드는 것은 애플리케이션의 협력 흐름을 쉽게 기술한다는 것을 의미
  - 설계를 유연하게 만들고 새로운 기능을 쉽게 추가할 수 있다.

## 상속과 합성

상속 보다는 합성을 활용하는 것이 좋다.

### 상속의 문제점

- 캡슐화를 위반한다. (부모 클래스의 구현이 자식 클래스에게 노출되기 때문에 캡슐화 약화)
- 하위 클래스가 상위 클래스에 강하게 의존, 결합하기 때문에 변화에 유연하게 대처하기 어렵다.

### 합성이 좋은 이유?

- 메서드를 호출하는 방식으로 동작하기 때문에 변경에 쉽게 대처할 수 있다. (정의된 메서드만 호출하기 때문에 느슨한 결합)
- 의존하는 인스턴스만 교체하면 되기 때문에 설계를 유연하게 만들 수 있다.

### 상속을 사용해야하는 경우는?

- 명확하게 계층 구조를 표현해야하는 경우 (is-a 관계)
  - 고양이 → 동물
  - 전기자동차 → 자동차
- 반면 (has-a) 관계는 합성을 사용하는 것이 좋다.
  - 자동차는 엔진을 갖는다.
  - 학생은 여러 과목을 신청한다.
  - 고객은 여러 계좌를 갖는다.
- 상위 클래스의 변경 사항이 자식 클래스로 전파되어도 문제가 없다는 것이 보장되는 경우
