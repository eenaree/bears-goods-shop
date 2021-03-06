# Bears Goods

> 두산베어스 굿즈 상품을 판매하는 작은 쇼핑몰 웹 사이트입니다.

## [배포 링크](https://bears-goods.vercel.app/)

## 설치 방법

```
npm i
```

## 개발 환경 세팅

- Client: /client 디렉토리로 이동 후, 아래 명령어 실행
- Server: /server 디렉토리로 이동 후, 아래 명령어 실행

```
npm run dev
```

## 프로젝트 리뷰

> 기간: 2022.5.15 ~

### 프로젝트 구조

```
└──src
    ├──components
    ├──context
    ├──layouts
    ├──lib
    │  ├──api
    │  └──hooks
    ├──pages
    ├──reducers
    ├──styles
    └──typings
```

- pages: 페이지의 최상위 라우트를 담당하는 컴포넌트
- layouts: 레이아웃을 담당하는 컴포넌트 ex) `App`, `AppLayout`, `Header`
- styles: emotion Global styles, reset css, media query 파일 정의
- typings: 여러 컴포넌트에 자주 쓰이는 타입 정의

### 구현 기능

- fake API를 통해 서버로부터 받아온 데이터를 페이지별로 화면에 렌더링
- 쿼리스트링 값을 이용한 상품 분류 (카테고리별, 가격별)
- 선택한 상품 옵션에 따른 상품 금액 및 총 주문금액 계산
- 장바구니 추가 및 새로고침시 장바구니 목록 유지 (Local Storage 사용)
- 로딩 상태 진행 바
- 장바구니 추가 완료, 상품 삭제 확인 팝업창

### 오답 노트

- [사용자가 선택한 옵션을 장바구니에 추가할 때, 중복성 처리하기](https://velog.io/@eenaree/shopping-cart-item-duplicate-check)
- [장바구니 아이템을 모두 삭제했는데, 전체 선택 박스가 체크 되어 있어요!](https://velog.io/@eenaree/checkbox-allselected-bug)
- [사용자에게 수량을 입력 받을 때, 어디까지 입력을 허용해야 할까요?](https://velog.io/@eenaree/react-input-quantity-event)
- [사용자가 A, B, C를 모두 클릭했더라도 마지막으로 클릭한 C만 보여주고 싶어요!](https://velog.io/@eenaree/javascript-cancel-promise)
- [로딩상태를 나타내는 진행바 만들기](https://velog.io/@eenaree/loading-progress-bar)

### 부족했던 점

<details>
    <summary>비효율적인 상태 관리... 상태값을 파악하는 능력</summary>

컴포넌트에서 상태는 렌더링과 연결되는 부분이기 때문에 매우 중요한 부분인데, 가장 간과한 것 같다.  
처음에 작성한 상태값들이 다른 상태를 기반으로 하여 계산될 수 있는 값들로 많이 파생되어져 나왔고, 그러다보니 초반에 작성한 상태 관리와 나중에 다시 고친 상태 관리 코드는 매우 큰 차이가 있었다.

예를 들면, 옵션, 장바구니 같은 상태값을 다룰 때, 총 가격, 전체 선택 여부 같은 값들이 전부 그렇다.  
물론 그 과정이 꼭 나쁜 것만은 아니었다. 배열값을 가지고 이렇게도 해보고 저렇게도 해보고 연습할 수 있는 시간이었다.

좀 더 적어보자면, 장바구니 상태를 다룰 때, 여러 페이지에 걸쳐 사용되기 때문에 이를 전역 상태로 파악하고 context api를 사용했다.  
장바구니의 상태가 수량 변경, 선택, 삭제 등의 여부에 따라 상태의 변화가 자주 발생했다.  
가령, 수량의 변화가 발생할 때, 전체 아이템의 개수는 변하지 않기 때문에 아이템의 개수를 보여주는 영역은 렌더링되지 않아야 하는데, 이 렌더링을 방지하고자, 그 상태값에 기인하여 파생값으로 만들어 최적화를 한 뒤, 새로운 컨텍스트를 생성하여 이를 전달해야 했다.  
만약 그러한 값이 또 존재한다고 하면, 여러 개의 컨텍스트가 중첩될 수 있기 때문에 컨텍스트의 흐름을 파악하기가 쉽지 않을 것이다.

컨텍스트를 전역 상태 관리로 사용할 수도 있겠지만, 개인적으로는 앱 전체 내에 전역으로 사용할 것이라면 파생되는 값이 적고, 상태 변화가 빈번하지 않은 값일 경우에 사용하는 것이 좋다고 생각한다.

</details>

<details>
    <summary>컴포넌트 분리를 제대로 한 것이 맞는가?</summary>

상태 관리만큼 어려운게 또 하나 있다면 컴포넌트를 분리하는 작업이었다.  
map 함수를 이용하여 반복 패턴의 컴포넌트를 만드는 것은 쉬워도, 그 외의 나머지 것들에 대하여 어떤 방식으로 나눌 것인가에 대한 개념이 잡혀있지 않다고 해야 하나?  
프로젝트를 하면서는, 나름대로 고민하면서 나눴다고 생각했는데 전혀 아닌 것 같다.  
페이지 컴포넌트에서 다 때려박고, 뷰가 너무 복잡해보이니 억지로 쪼갠 느낌.

컴포넌트라는 것이 꼭 재사용이 가능해야만 하다고는 생각하지 않는다.  
해당 컴포넌트마다 각자의 역할이 있고, 그에 맞는 상태값과 로직이 있을 것인데 그런 부분들에 대한 정립없이 코드를 작성했다.  
그러다보니 특정 컴포넌트에 상태값이나 로직 같은 것들이 너무 많이 들어있는 경우도 있었고, 특정 상태값에 의존하는 부분이 있을 때, 이것을 하나의 컴포넌트 안에 다 넣을 것인지, 작은 단위로 쪼갠 다음 나눠야 하는지 판단이 서질 않았다.

일단은 코드를 많이 작성해보면서, 엘리먼트들을 컴포넌트화 시키는 연습을 자주 해봐야 할 것 같다.

</details>
