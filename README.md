# WSD Movie App

TMDB API를 활용해 인기 영화·검색·위시리스트를 제공하는 정적 웹 애플리케이션입니다.

---

## 데모

- GitHub Pages: https://misosos.github.io/wsd-movie-app/

---

## 기술 스택

- **Framework**: React, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Font Awesome (fas / fab)
- **State & Storage**
    - LocalStorage 기반 로그인/회원가입 정보 저장
    - LocalStorage 기반 위시리스트 저장
- **API**: [TMDB API](https://www.themoviedb.org/)

---

## 주요 기능

- TMDB 인기/상영중/상영예정/높은 평점 영화 조회
- 장르, 평점, 언어, 정렬 기준으로 영화 검색 및 필터링
- LocalStorage 기반 로그인/회원가입 및 자동 로그인
- 위시리스트 추가/삭제 및 저장
- 모바일/데스크탑 반응형 레이아웃 지원

---

## 의존성 설치

프로젝트를 처음 클론한 후 아래 명령어로 필요한 패키지를 설치합니다.

```bash
npm install
```

---

## 개발 서버 실행

아래 명령어로 개발 서버를 실행할 수 있습니다.

```bash
npm run dev
```

기본 주소는 다음과 같습니다.

```text
http://localhost:5173
```

---

## 프로덕션 빌드 & 미리보기

프로덕션용 빌드와 로컬 미리보기는 다음 명령어를 사용합니다.

```bash
npm run build
npm run preview
```


