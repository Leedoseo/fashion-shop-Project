# 🛍️ Fashion Shop

Fake Store API를 활용한 React 기반 패션 쇼핑몰 프로젝트입니다.

## 📌 프로젝트 소개

React의 핵심 개념(Context API, Custom Hook, React Router 등)을 활용하여
실제 쇼핑몰과 유사한 기능을 구현한 포트폴리오 프로젝트입니다.

## ✨ 주요 기능

- 🏠 홈 페이지 - 베스트 상품, 신상품, 카테고리 바로가기
- 📋 상품 목록 - 카테고리 필터, 가격 필터, 검색, 정렬
- 🔍 상품 상세 - 상품 정보, 수량 선택, 평점
- 🛒 장바구니 - 상품 추가/삭제/수량 변경, 총 금액 계산
- ❤️ 찜 목록 - 찜하기/취소, 장바구니 바로 담기
- 📦 주문/결제 - 배송지 입력, 결제 수단 선택, 주문 완료
- 🔎 헤더 검색 - 검색어로 상품 목록 페이지 이동
- 📱 반응형 디자인 - 모바일/태블릿/데스크탑 지원

## 🛠️ 기술 스택

| 분류     | 기술                                       |
| -------- | ------------------------------------------ |
| Frontend | React 18, Vite                             |
| Routing  | React Router v6                            |
| 상태관리 | Context API, Custom Hooks                  |
| 스타일링 | Tailwind CSS v3                            |
| HTTP     | Axios                                      |
| 아이콘   | React Icons                                |
| 배포     | Vercel                                     |
| API      | [Fake Store API](https://fakestoreapi.com) |

## 📁 폴더 구조

```
src/
├── api/          # API 호출 함수
├── components/   # 공통 컴포넌트
│   └── common/
├── contexts/     # Context API
├── hooks/        # Custom Hooks
├── pages/        # 페이지 컴포넌트
└── utils/        # 유틸리티 함수
```

## 🔧 트러블슈팅

### 1. Vite Fast Refresh 경고

**문제**
`CartContext.jsx`에서 `CartProvider`(컴포넌트)와 `useCart`(훅)를 같이 export하자
`Fast Refresh only works when a file only exports components` 경고 발생

**원인**
Vite의 Fast Refresh는 컴포넌트만 export하는 파일에서만 정상 작동

**해결**

- `cartContext.js` - Context만 분리
- `hooks/useCart.js` - 훅만 분리
- `CartContext.jsx` - Provider 컴포넌트만 export

---

### 2. ProductListPage 초기화 전 접근 에러

**문제**
상품 목록 페이지 접근 시 흰 화면과 함께 ErrorBoundary 작동
`ReferenceError: Cannot access 'currentCategory' before initialization`

**원인**
JS의 TDZ(Temporal Dead Zone) - `const`로 선언된 변수는 선언 전에 접근 불가
`searchParams` 선언 전에 `currentCategory`에서 `searchParams.get()`을 호출하고 있었음

**해결**
`searchParams` → `currentCategory` → `useProducts` 순서로 선언 순서 변경

## 📷 스크린샷

| 홈 페이지                       | 상품 목록                             |
| ------------------------------- | ------------------------------------- |
| ![홈](public/screenshots/1.png) | ![상품목록](public/screenshots/2.png) |

| 상품 상세                         | 장바구니                              |
| --------------------------------- | ------------------------------------- |
| ![상세](public/screenshots/3.png) | ![장바구니](public/screenshots/4.png) |

| 찜 목록                         | 주문 페이지                       |
| ------------------------------- | --------------------------------- |
| ![찜](public/screenshots/5.png) | ![주문](public/screenshots/6.png) |

| 주문 완료                              |
| -------------------------------------- |
| ![주문 완료](public/screenshots/7.png) |

## 🔗 배포 링크

[Fashion Shop 바로가기](https://fashion-shop-project-tau.vercel.app/)
