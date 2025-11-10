# Dalli Template

Material UI와 TypeScript를 사용하는 풀스택 프로젝트 템플릿입니다.

## 프로젝트 구조

```
dalli-template/
├── frontend/          # React + TypeScript + Material UI
├── backend/           # FastAPI
├── database/          # PostgreSQL 설정 및 초기화 스크립트
└── docker-compose.yaml
```

## 기술 스택

### Frontend
- React 18
- TypeScript
- Material UI (MUI)
- Vite
- React Router
- Recharts (차트)

### Backend
- Python 3.11
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL

### Database
- PostgreSQL 16

## 시작하기

### 필수 요구사항
- Docker & Docker Compose
- Node.js 20+ (로컬 개발 시)
- Python 3.11+ (로컬 개발 시)

### Docker로 전체 스택 실행

```bash
docker-compose up --build
```

서비스 접속:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API 문서: http://localhost:8000/docs
- Database: localhost:5432

### 로컬 개발

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 환경 변수

각 디렉토리에 `.env.example` 파일이 있습니다. 이를 복사하여 `.env` 파일을 생성하고 필요한 값을 설정하세요.

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

### Backend (.env)
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=dalli_db
POSTGRES_HOST=database
POSTGRES_PORT=5432
```

## 주요 기능

- Material UI Dashboard 템플릿 기반 UI
- Responsive 레이아웃 (Sidebar + AppBar)
- Chart 컴포넌트 (Recharts)
- REST API (FastAPI)
- PostgreSQL 데이터베이스 연동
- Docker Compose로 간편한 배포

## 개발 가이드

### 새로운 페이지 추가
1. `frontend/src/pages/` 에 새 컴포넌트 생성
2. `frontend/src/App.tsx` 에 라우트 추가
3. `frontend/src/components/Sidebar.tsx` 에 메뉴 아이템 추가 (선택사항)

### 새로운 API 엔드포인트 추가
1. `backend/app/models/` 에 모델 정의
2. `backend/app/schemas/` 에 스키마 정의
3. `backend/app/api/` 에 라우터 생성
4. `backend/main.py` 에 라우터 등록

## 라이선스

MIT
