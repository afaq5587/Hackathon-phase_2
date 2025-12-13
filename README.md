# Fullstack Todo App

This is a full-stack todo application with a React frontend (using Next.js) and a Python backend (using FastAPI).

## Project Structure

- `frontend/`: Contains the Next.js frontend application.
- `backend/`: Contains the FastAPI backend application.

## Getting Started

To get the application running, you'll need to start both the frontend and backend servers.

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install the Python dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3.  Run the database migrations:
    ```bash
    alembic upgrade head
    ```

4.  Start the backend server:
    ```bash
    uvicorn main:app --reload
    ```

The backend server will be running on `http://127.0.0.1:8000`.

### Frontend Setup

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```

2.  Install the Node.js dependencies:
    ```bash
    npm install
    ```

3.  Start the frontend development server:
    ```bash
    npm run dev
    ```

The frontend application will be available at `http://localhost:3000`.

## Usage

- Open your browser to `http://localhost:3000` to use the application.
- You can create, view, update, and delete tasks.
