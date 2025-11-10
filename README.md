# Dalli Template

A modern full-stack web application template built with React, FastAPI, and PostgreSQL. Features internationalization (i18n), theme switching, user management, and authentication.

## 🚀 Features

- **Modern UI**: Built with MUI Joy UI for a beautiful, responsive interface
- **Internationalization**: Support for English and Korean with easy language switching
- **Theme Switching**: Light, Dark, and System theme modes
- **User Management**: Full CRUD operations for user management
- **Authentication**: Secure JWT-based authentication system
- **Responsive Design**: Mobile-friendly layout with collapsible sidebar
- **Docker Support**: Easy deployment with Docker Compose

## 📁 Project Structure

```
dalli-template/
├── frontend/          # React + TypeScript + Joy UI
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts (Auth)
│   │   ├── i18n/          # Internationalization config and locales
│   │   ├── layouts/       # Layout components
│   │   ├── pages/         # Page components
│   │   └── theme/         # Theme configuration
│   └── package.json
├── backend/           # FastAPI
│   ├── app/
│   │   ├── api/          # API routes
│   │   ├── core/         # Core functionality (auth, config, database)
│   │   ├── models/       # Database models
│   │   └── schemas/      # Pydantic schemas
│   └── requirements.txt
├── database/         # PostgreSQL initialization scripts
│   └── init/
└── docker-compose.yaml
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **MUI Joy UI** - Component library
- **Vite** - Build tool
- **React Router** - Routing
- **i18next** - Internationalization
- **Recharts** - Chart library
- **Axios** - HTTP client

### Backend
- **Python 3.11** - Programming language
- **FastAPI** - Web framework
- **SQLAlchemy** - ORM
- **Pydantic** - Data validation
- **PostgreSQL** - Database
- **JWT** - Authentication

### Database
- **PostgreSQL 16** - Relational database

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server (production)

## 🚦 Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- Python 3.11+ (for local development)

### Quick Start with Docker

1. Clone the repository:
```bash
git clone https://github.com/dalli/dalli-template.git
cd dalli-template
```

2. Start all services:
```bash
docker-compose up --build
```

3. Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Database**: localhost:5432

### Local Development

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at http://localhost:5173

#### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will be available at http://localhost:8000

## ⚙️ Environment Variables

### Frontend (.env)

```env
VITE_API_URL=http://localhost:8000
```

### Backend (.env)

```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=dalli_db
POSTGRES_HOST=database
POSTGRES_PORT=5432
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 📋 Main Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Session management

### User Management
- Create, Read, Update, Delete users
- User role management (admin, user)
- User status management (active, inactive)
- Pagination support

### Internationalization (i18n)
- English and Korean language support
- Language switching in settings
- Persistent language preference
- Automatic language detection

### Theme Management
- Light, Dark, and System theme modes
- Theme switching in settings popup
- Persistent theme preference
- System theme detection

### Dashboard
- Overview statistics
- Charts and visualizations
- Responsive grid layout
- Interactive components

## 🎨 UI Components

- **Sidebar**: Collapsible navigation menu with user profile
- **Dashboard**: Overview with statistics and charts
- **Users**: User management table with CRUD operations
- **Settings**: Theme and language selection in popup menu
- **Sign In/Sign Up**: Modern authentication pages

## 🔧 Development Guide

### Adding a New Page

1. Create a new component in `frontend/src/pages/`:
```typescript
// frontend/src/pages/NewPage.tsx
import { Box, Typography } from '@mui/joy'

export default function NewPage() {
  return (
    <Box>
      <Typography level="h1">New Page</Typography>
    </Box>
  )
}
```

2. Add route in `frontend/src/App.tsx`:
```typescript
<Route path="new-page" element={<NewPage />} />
```

3. Add menu item in `frontend/src/components/Sidebar.tsx` (optional):
```typescript
{ textKey: 'common.newPage', icon: <NewPageIcon />, path: '/dashboard/new-page' }
```

4. Add translation keys in `frontend/src/i18n/locales/en.json` and `ko.json`:
```json
{
  "common": {
    "newPage": "New Page"
  }
}
```

### Adding a New API Endpoint

1. Create model in `backend/app/models/`:
```python
# backend/app/models/new_model.py
from sqlalchemy import Column, Integer, String
from app.core.database import Base

class NewModel(Base):
    __tablename__ = "new_models"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
```

2. Create schema in `backend/app/schemas/`:
```python
# backend/app/schemas/new_model.py
from pydantic import BaseModel

class NewModelBase(BaseModel):
    name: str

class NewModelCreate(NewModelBase):
    pass

class NewModel(NewModelBase):
    id: int
    
    class Config:
        from_attributes = True
```

3. Create router in `backend/app/api/`:
```python
# backend/app/api/new_model.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.new_model import NewModel
from app.schemas.new_model import NewModelCreate, NewModel

router = APIRouter()

@router.post("/", response_model=NewModel)
def create_new_model(new_model: NewModelCreate, db: Session = Depends(get_db)):
    # Implementation
    pass
```

4. Register router in `backend/main.py`:
```python
from app.api import new_model
app.include_router(new_model.router, prefix="/api/new-models", tags=["new-models"])
```

### Adding a New Language

1. Create locale file in `frontend/src/i18n/locales/`:
```json
// frontend/src/i18n/locales/fr.json
{
  "common": {
    "home": "Accueil",
    ...
  }
}
```

2. Import and add to `frontend/src/i18n/config.ts`:
```typescript
import frTranslations from './locales/fr.json'

i18n.init({
  resources: {
    en: { translation: enTranslations },
    ko: { translation: koTranslations },
    fr: { translation: frTranslations },
  },
  // ...
})
```

3. Add language option in `frontend/src/components/Sidebar.tsx`:
```typescript
<MenuItem
  selected={currentLanguage === 'fr'}
  onClick={() => handleLanguageChange('fr')}
>
  {t('settings.french')}
</MenuItem>
```

## 📦 Docker Commands

```bash
# Build and start all services
docker-compose up --build

# Start services in detached mode
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild specific service
docker-compose up --build frontend

# Stop and remove volumes
docker-compose down -v
```

## 🧪 Testing

### Frontend
```bash
cd frontend
npm run lint
npm run build
```

### Backend
```bash
cd backend
# Run tests (if available)
pytest
```

## 📝 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🔐 Default Credentials

For development purposes, you can create a user through the sign-up page or use the API to create an admin user.

## 🐛 Troubleshooting

### Port Already in Use
If you encounter port conflicts:
```bash
# Change ports in docker-compose.yaml
ports:
  - "3001:80"  # Frontend
  - "8001:8000"  # Backend
```

### Database Connection Issues
Ensure PostgreSQL is running and check environment variables:
```bash
docker-compose ps
docker-compose logs database
```

### Frontend Build Errors
Clear node_modules and rebuild:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.
