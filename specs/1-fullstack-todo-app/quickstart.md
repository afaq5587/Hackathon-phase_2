# Quickstart: Full-Stack Todo Application

This guide provides instructions to set up and run the project locally.

## Prerequisites

- Python 3.9+ and `pip`
- Node.js 18+ and `npm`
- Git
- A Neon account for the PostgreSQL database

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

## 2. Backend Setup (FastAPI)

### a. Create and Activate Virtual Environment

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### b. Install Dependencies

```bash
pip install -r requirements.txt
```
*(Note: A `requirements.txt` file will be created during implementation)*

### c. Configure Environment Variables

Create a `.env` file in the `backend/` directory and add the following:

```env
DATABASE_URL="<your-neon-database-connection-string>"
SECRET_KEY="<your-secret-key-for-jwt>"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
```
*(Note: The `SECRET_KEY` is for Better Auth integration)*

### d. Run Database Migrations

*(This step will use a migration tool like Alembic, to be set up during implementation)*
```bash
alembic upgrade head
```

### e. Run the Backend Server

```bash
uvicorn src.main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

## 3. Frontend Setup (Next.js)

### a. Navigate to Frontend Directory

```bash
cd ../frontend
```

### b. Install Dependencies

```bash
npm install
```

### c. Configure Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
NEXT_PUBLIC_API_URL="http://127.0.0.1:8000"
```

### d. Run the Frontend Development Server

```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 4. Running the Application

1.  Ensure both the backend and frontend servers are running in separate terminals.
2.  Open your browser to `http://localhost:3000`.
3.  You should see the signup/login page. Create an account and start using the Todo application.
