from app.core.database import engine, Base, SessionLocal
from app.models.user import User, UserRole
from app.core.security import get_password_hash
import time

def init_db():
    """Initialize database tables"""
    Base.metadata.create_all(bind=engine)
    
    # Wait a bit for database to be ready
    time.sleep(1)
    
    # Create test users
    db = SessionLocal()
    try:
        # Check if admin user already exists
        admin_user = db.query(User).filter(User.email == "admin@example.com").first()
        if not admin_user:
            password_hash = get_password_hash("password")
            admin_user = User(
                email="admin@example.com",
                name="Admin User",
                hashed_password=password_hash,
                role=UserRole.ADMIN,
                is_active=True
            )
            db.add(admin_user)
            print("Creating admin user: admin@example.com")
        
        # Check if test user already exists
        test_user = db.query(User).filter(User.email == "test@example.com").first()
        if not test_user:
            password_hash = get_password_hash("password")
            test_user = User(
                email="test@example.com",
                name="Test User",
                hashed_password=password_hash,
                role=UserRole.USER,
                is_active=True
            )
            db.add(test_user)
            print("Creating test user: test@example.com")
        
        db.commit()
        print("Test users created successfully")
    except Exception as e:
        db.rollback()
        import traceback
        print(f"Error creating test users: {e}")
        traceback.print_exc()
    finally:
        db.close()

