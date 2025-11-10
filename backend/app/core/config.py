from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    PROJECT_NAME: str = "Dalli API"
    VERSION: str = "0.1.0"

    # Database
    POSTGRES_USER: str = "postgres"
    POSTGRES_PASSWORD: str = "postgres"
    POSTGRES_DB: str = "dalli_db"
    POSTGRES_HOST: str = "database"
    POSTGRES_PORT: int = 5432

    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost"]

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
