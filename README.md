# Google Calendar Clone / 프로젝트 설명

React와 TypeScript Redux Toolkit를 사용하여 구현한 Google Calendar 클론 프로젝트입니다.

## 실행 방법

1. 의존성 설치:

```bash
$ npm install
```

2. 개발 서버 실행

```bash
$ npm start
```

## 구현된 기능

### 캘린더 뷰

- 월간/주간 뷰 전환
- 오늘 날짜로 이동
- 이전/다음 월(주) 네비게이션
- 반응형 레이아웃 지원

### 일정 관리

- 이벤트 생성/조회/삭제
- 이벤트 시작/종료 시간 설정
- 이벤트 색상 커스터마이징
- 서로 다른 시간의 이벤트 중첩
- 반복 일정 설정 (매일/매주/매년)

## 기술 스택

### Frontend

- React
- TypeScript
- Redux Toolkit (상태 관리 - 권장사항)
- Tailwind CSS (스타일링 - 권장사항)
- Day.js (날짜 처리)

## 프로젝트 구조

```
src/
├── components/
│ ├── calendar/ # 캘린더 관련 컴포넌트
│ ├── common/ # 공통 컴포넌트
│ ├── layout/ # 레이아웃 컴포넌트
│ └── modal/ # 모달 컴포넌트
├── store/ # Redux 스토어 및 슬라이스
├── utils/ # 유틸리티 함수
├── hooks/ # 커스텀 훅
└── configs/ # 설정 파일
```

## Redux Store 구조

1. Date Store (calendarSlice)
- 캘린더의 날짜 관련 상태를 관리합니다.
- 현재 선택된 날짜
- 일정 생성/수정 시 시작/종료 날짜 및 시간
2. Schedule Store (scheduleSlice)
- 일정 데이터를 관리합니다.
- 전체 일정 목록 관리
- 일정 정보: 제목, 설명, 날짜, 시간, 색상, 반복 설정
3. Modal Store (modalSlice)
- 모달 창의 상태를 관리합니다.
- 일정 생성 모달
- 일정 상세 보기 모달
- 모달 열기/닫기 상태
4. View Mode Store (viewModeSlice)
- 캘린더 뷰 모드를 관리합니다.
- 월간/주간 뷰 전환
- 현재 선택된 뷰 모드 상태

## 부족한점

- 현재 일정은 선택한 시간의 최대 23시간 30분까지 등록 가능. 이를 해결할 필요가 있습니다.
- 반복 일정의 전체 삭제 및 단독 삭제 기능이 미구현 상태입니다.
- 동일 로직 컴포넌트 분리
  - 예: 현재 유사한 로직을 가진 여러 Select 컴포넌트들을 하나의 공통 컴포넌트로 통합이 필요
