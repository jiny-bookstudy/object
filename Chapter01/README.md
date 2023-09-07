## 프로그래밍과 패러다임

### 패러다임의 어원

> 토마스 쿤은 ‘과학혁명의 구조’에서 과거 수세기에 걸쳐 일어난 과학혁명을 주도적인 패러다임이 변경된 결과로 인해 발생한 것으로 설명하였다. 쿤의 의견 중 일부는 우리 분야에도 적절한 것으로 보인다. 사실, 프로그래밍 언어는 일반적으로 어떤 패러다임의 사용을 권장하고 다른 패러다임의 사용을 막는다.
> _로버트 플레이트_

- **쿤의 패러다임:** 특정 시대의 어느 성숙한 과학자 공동체에 의해 수용된 방법들의 원천인 동시에 문제의 영역
- **프로그래밍 패러다임:** 특정 시대의 어느 성숙한 개발자 공동체에 의해 수용된 프로그래밍 방법과 문제 해결 방법, 프로그래밍 스타일

### 프로그래밍에서의 패러다임

즉, **프로그래밍 패러다임**은 개발자 공동체가 동일한 프로그래밍 스타일과 모델을 공유함으로써 의견 충돌이 일어나는 불필요한 부분을 방지하는 것이다. 각 프로그래밍 언어가 제공하는 특징과 프로그래밍 스타일은 해당 언어가 채택하는 프로그래밍 패러다임에 따라 달라진다.

- 절차 지향 패러다임: C 언어
- 객체 지향 패러다임: Java
- 함수 지향 패러다임: LISP, Haskell

주의 사항은 절차 지향 패러다임에서 객체 지향 패러다임으로 전환되었다고 해서 두 패러다임이 존재 할 수 없는 것은 아니다. (예를 들어 `Scala` 언어는 함수형 패러다임과 객체 지향 패러다임을 접목시킨 다중 패러다임 언어이다.)

또 내가 많이 사용하는 JavaScript도 초기 절차형 패러다임에서, 경우에 따라 함수형 패러다임 or 객체 지향 패러다임까지 수용할 수 있는 다중 패러다임 언어이기도 하다.

## 티켓 판매 애플리케이션 구현으로 보는 객체 지향

### 🎫 티켓 판매 애플리케이션 요구사항

1. 연극이나 음악회를 공연할 수 있는 작은 소극장이 존재한다.
2. 추첨을 통해 선정된 관람객에게 무료 초대장을 발송한다.
3. 이벤트에 당첨된 관람객과 그렇지 않은 관람객을 구분하여 입장시킨다.

### 초대장 클래스 (Invitaion)

```jsx
class Invitation {
  #when = null;

  constructor(when) {
    this.#when = when;
  }
}

export default Invitation;
```

### 티켓 클래스 (Ticket)

```jsx
class Ticket {
  #fee = 0;

  constructor(fee) {
    this.#fee = fee;
  }

  get fee() {
    return this.#fee;
  }
}

export default Ticket;
```

### 관람객 클래스 (Audience)

```jsx
class Audience {
  #bag = null;

  constructor(bag) {
    this.#bag = bag;
  }

  get bag() {
    return this.#bag;
  }
}

export default Audience;
```

### 소지품을 보관할 가방 클래스 (Bag)

```jsx
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
```

### 티켓 관리소 클래스 (TicketOffice)

```jsx
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
```

### 매표소 클래스 (TicketSeller)

```jsx
class TicketSeller {
  #ticketOffice = null;
  constructor(ticketOffice) {
    this.ticketOffice = ticketOffice;
  }

  get ticketOffice() {
    return this.#ticketOffice;
  }
}

export default TicketSeller;
```

### 소극장 클래스 (Theater)

```jsx
class Theater {
  #ticketSeller = null;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  enter(audience) {
    if (audience.bag.hasInvitation()) {
      const ticket = this.#ticketSeller.ticketOffice.getTicket();
      audience.bag.setTicket(ticket);
      return;
    }
    const ticket = this.#ticketSeller.ticketOffice.getTicket();
    audience.bag.minusAmount(ticket.fee);
    this.#ticketSeller.ticketOffice.plusAmount(ticket.fee);
    audience.bag.setTicket(ticket);
  }
}

export default Theater;
```

## 무엇이 문제인가?

> 모듈은 제대로 실행되어야 하고, 변경이 용이해야하며, 이해하기 쉬워야한다.
> _로버트 마틴_

### 예상을 빗나가는 코드

현재 작성한 코드는 현실성이 너무 떨어진다. 예상을 빗나가지 않는 코드란, 말 그대로 우리가 현실에서 생각하는 시나리오와 크게 다르지 않는 코드이다. 현실에서 티켓을 사려면? 주체는 당연히 ‘사람’이 된다. 즉 사람이 원하면 매표소에서 티켓을 구매한다. **(사람 → 매표소)**

하지만 아래의 코드에서 소극장 클래스에서 직접 관람객 인스턴스의 가방에 접근하는 것을 볼 수 있다.

```jsx
class Theater {
  #ticketSeller = null;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  //소극장 클래스에서 관람객 인스턴스의 가방을 확인하는 것은 현실과 동떨어진다.
  enter(audience) {
    if (audience.bag.hasInvitation()) {
      const ticket = this.#ticketSeller.ticketOffice.getTicket();
      audience.bag.setTicket(ticket);
      return;
    }
    const ticket = this.#ticketSeller.ticketOffice.getTicket();
    audience.bag.minusAmount(ticket.fee);
    this.#ticketSeller.ticketOffice.plusAmount(ticket.fee);
    audience.bag.setTicket(ticket);
  }
}

export default Theater;
```

예상을 빗나간다는 의미는 해당 코드를 수정하기 위해 알아야 할 포인트가 예상 밖으로 늘어난다는 점이다. 현재 상황은 Thater → Audience → Bag 클래스 뿐만 아니라 Ticket까지 확인을 해야하는 상황이 벌어진다.

### 변경에 취약한 코드

만약 관람객(Audience)이 가방(Bag)을 갖지 않는 상황이라면? 해당 클래스나 인스턴스를 사용하는 부분까지 모두 변경이 필요로하다. 큰 부분이 아니더라도 작은 부분이라도 바뀌어도 의존하고 있는 클래스도 같이 수정이 필요할 수 있다.

**즉, 다른 클래스가 변경하려는 클래스의 내부에 대해 많이 알면 알수록 변경이 취약해진다.** 이러한 문제를 해결하기 위해서는 최손한의 의존성만 유지하고 불필요한 의존성을 제거해야한다.

(의존성이 높은 경우를 결합도가 높다고 의미 → 설계의 목표는 객체 사이의 결합도를 낮춰 변경이 용이한 설계를 만드는 것을 목표로 두어야 한다.)

## 설계 계선하기

### 이해하기 쉬운 코드로 변경하기

앞서 말했던 “예상을 빗나가는 코드”를 바꾸러면 코드를 어떻게 개선시킬 수 있을까?

해결 방법은 클래스에서 다른 클래스 내용을 최소화하는 것이다. 즉, **자신의 정보를 외부에서 접근하지 못하도록 차단하는 것**이다. 클래스를 외부에서 접근하게 하지말고, **스스로 일할 수 있도록 자율적인 존재**로 만들어보기

```jsx
//TicketSeller.js
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

//Theater.js
class Theater {
  #ticketSeller = null;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  enter(audience) {
    this.#ticketSeller.sellTo(audience);
  }
}
```

소극장(Theater), 매표소(TicketSeller) 클래스는 더이상 관람객(Audience)의 내부 구현체를 알지 않아도 되며, 인터페이스에만 의존한다. 객체를 인터페이스와 구현으로 나누고 인터페이스만 공개하는 것은 객체 사이의 결합도를 낮추고 변경하기 쉬운 코드를 만들기 위한 기본 원칙이다.

```
//Audieunce.js
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
```

관람객(Audience) 클래스도 외부에서 `getter`로 내부 멤버에 접근하는 것이 아니라 스스로 티켓을 구매할 수 있도록 메서드를 호출하게끔 변경하였다.

### 개선 결과

- 소극장(Theater) 클래스에서 ‘티켓을 판매하는 행위’를 판매소(TicketSeller) 클래스로 옮기고, ‘티켓을 구매하는 행위’는 관람객(Audience) 클래스에서 스스로 행동할 수 있도록 자율성을 부여하였다.
- 외부에서 판매소(TicketSeller), 관람객(Audience) 클래스 내부에 신경쓰지 않아도 되며 이는 곧 변경에 용이한 코드로 개선이되었다.

## 캡슐화와 응집도 (By. 클린코드)

> 응집도가 높다라는 말은 클래스에 속한 변수가 서로 의존하며 논리적인 단위로 묶인다는 의미이다.
> **_클린코드 - 응집도_**

응집도(cohesion)가 높다라는 것은 밀접하게 연관된 작업만을 수행하고, 이외의 작업은 다른 클래스(객체)에게 위임하는 것을 의미한다. 즉 자신이 연관된 일만 부여하고, 스스로 일할 수 있는 자율적인 존재로 만드는 것이 결합도를 낮추고 응집도를 높이는 방법이다.

### 단일 책임 원칙

단일 책임 원칙(Single Responsibility Principle)은 **클래스나 모듈을 변경할 이유가 단 하나뿐이어야 한다.**

클래스에 책임이 적어지다보면 자연스럽게 관리해야 할 클래스 조각들이 많아진다. 그럼 반대로 큰 그림을 이해하기 어렵지 않을까..? → 도메인 단위, 모듈, 행동 단위로 다시생각해보기

**\*\*\*\***\*\*\*\***\*\*\*\***클래스 개수에 민감해 할 필요는 없다.**\*\*\*\***\*\*\*\***\*\*\*\***

- 작은 클래스가 많은 시스템 vs 많은 책임의 큰 클래스가 몇 개 뿐인 시스템에서 돌아가는 부품은 비슷하다.
- 이름과 기능이 명확한 컴포넌트를 나눠 넣고 싶은가 vs 큰 서랍 몇 개를 두고 모두를 던져 놓고 싶은가
- 작은 클래스는 각자 맡은 책임이 하나이기 때문에 변경 할 이유도 하나이다.

각자 맡은 책임을 가진 여러 클래스들이 협력해 시스템에 필요한 동작을 수행하는 것이 이상적이다.

## 절차지향과 객체지향

### 절차적 프로그래밍

```jsx
class Theater {
  #ticketSeller = null;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }
	//소극장은 관람객을 입장시켜야한다.
  enter(audience) {
		//관감객의 가방에서 초대장이 있는지 검사한다.
    if (audience.bag.hasInvitation()) {
			//초대장이 존재한다면 매표소에서 티켓을 발급받는다.
      const ticket = this.#ticketSeller.ticketOffice.getTicket();
			//발급된 티켓을 관감객의 가방에 삽입한다.
      audience.bag.setTicket(ticket);
      return;
    }
		...
  }
}

export default Theater;
```

개선시키기 전 소극장(Theater) 클래스에서 Audience와 TicketSeller로부터 소지품(Bag)과 티켓발급(ticketOffice.getTicket())을 통해 관람객을 입장시키는 절차를 구현하였다. 여기서 정보와 처리를 나누면 다음과 같다.

- **정보:** Audience, TicketSeller, TicketOffice → 데이터
- **처리:** enter → 프로세스

이처럼 **프로세스와 데이터를 별도의 모듈에 위치시키는 방식을 절차적 프로그래밍이라고 한다.** 절차지향의 문제점은 데이터 변경으로 인한 부수적인 영향을 지역적으로 고립시키기 어렵다는 점이다.

데이터(Audience, TicketSeller)가 변경 된다면 이를 사용하는 프로세스(enter)부분도 함께 변경해야한다.

이는 곧 변경에 용이한 코드가 어렵다는 문제가 발생한다.

### 객체지향 프로그래밍(OOP)

```jsx
//Theater.js
class Theater {
  #ticketSeller = null;

  constructor(ticketSeller) {
    this.#ticketSeller = ticketSeller;
  }

  enter(audience) {
    this.#ticketSeller.sellTo(audience);
  }
}
```

다시 개선된 코드를 보면 자신의 데이터를 스스로 처리하도록 입장하는 관람객의 인스턴스를 받아 판매하는 행위를 TicketSeller로 위임하였다. 사용하는 프로세스와 데이터도 TicketSeller에 같이 소유하고 있다. 이처럼 데이터와 프로세스가 동일한 모듈 내부에 위치하도록 프로그래밍 하는 방식을 객체지향 프로그래밍이라고 부른다.

### 책임의 이동

두 방식의 큰 차이점은 기능을 처리하는 방법이다. 절차 지향은 책임이 매표소(Theater) 클래스에 중앙 집중되어있다. 반면 개선된 코드에 나타난 객체지향 방식에서는 독재자가 존재하지 않고 각 객체에 책임이 스스로 분배되어 있다. **객체지향의 핵심은 적절한 객체에 적절한 핵심을 할당하는 것**이다.
