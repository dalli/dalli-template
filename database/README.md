# Database

PostgreSQL database configuration and initialization scripts.

## Structure

- `init/`: Database initialization scripts
- `migrations/`: Database migration files (managed by Alembic)

## Usage

The database is automatically initialized when running `docker-compose up`.

For local development, ensure PostgreSQL is running and update the connection string in the backend `.env` file.
